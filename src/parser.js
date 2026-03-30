/**
 * Kai Parser - Recursive Descent Parser
 * Converts tokens into an Abstract Syntax Tree (AST)
 */

const { TokenType } = require('./lexer');
const {
  Program,
  NumberLiteral,
  StringLiteral,
  BoolLiteral,
  NullLiteral,
  ArrayLiteral,
  RecordLiteral,
  Identifier,
  BinaryExpr,
  UnaryExpr,
  AssignStmt,
  AssignExpr,
  FuncExpr,
  CallExpr,
  MemberExpr,
  BlockExpr,
  IfExpr,
  ReturnStmt,
  ForLoop,
  WhileLoop,
  BreakStmt,
  ContinueStmt,
  PipeExpr,
} = require('./ast');

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
  }

  /**
   * Parse the entire token stream into a Program AST node
   */
  parse() {
    const statements = [];

    while (!this.isAtEnd()) {
      // Skip newlines between statements
      while (this.match(TokenType.NEWLINE)) {
        // Skip
      }

      if (this.isAtEnd()) break;

      statements.push(this.statement());
    }

    return new Program(statements);
  }

  /**
   * Parse a statement (assignment, return, if, for, while, break, continue, or expression)
   */
  statement() {
    // If statement: if cond { ... } else { ... }
    if (this.check(TokenType.IDENT) && this.peek().value === 'if') {
      return this.parseIfStatement();
    }

    // While loop: while cond { ... }
    if (this.check(TokenType.IDENT) && this.peek().value === 'while') {
      return this.parseWhileLoop();
    }

    // For loop: for var in iterable { ... }
    if (this.check(TokenType.IDENT) && this.peek().value === 'for') {
      return this.parseForLoop();
    }

    // Break statement: break
    if (this.check(TokenType.IDENT) && this.peek().value === 'break') {
      this.advance(); // consume 'break'
      return new BreakStmt();
    }

    // Continue statement: continue
    if (this.check(TokenType.IDENT) && this.peek().value === 'continue') {
      this.advance(); // consume 'continue'
      return new ContinueStmt();
    }

    // Return statement: return expr
    if (this.check(TokenType.IDENT) && this.peek().value === 'return') {
      this.advance();
      const value = this.expression();
      return new ReturnStmt(value);
    }

    // Assignment/Mutation: ident or ident : type := expr or target = expr
    if (this.check(TokenType.IDENT)) {
      const ident = this.peek();

      // Look ahead to check if this is an assignment or mutation
      // We need to look ahead further to detect patterns like:
      // x := expr (simple assignment)
      // x : type := expr (typed assignment)
      // x = expr (variable mutation)
      // x.y = expr (member mutation, including chained: x.y.z = expr)

      let i = this.current + 1;

      // Check for typed assignment: x : type := ...
      // Pattern: IDENT COLON IDENT ASSIGN ...
      // This must be checked before mutation because ':' comes before '='
      if (i < this.tokens.length && this.tokens[i].type === TokenType.COLON) {
        if (i + 1 < this.tokens.length && this.tokens[i + 1].type === TokenType.IDENT) {
          const name = this.advance().value;
          this.advance(); // consume ':'
          const annotation = this.parseTypeAnnotation();

          if (!this.check(TokenType.ASSIGN)) {
            this.error(this.peek(), `Expected ':=' after type annotation`);
          }
          this.advance(); // consume ':='

          const value = this.expression();
          return new AssignStmt(name, value, annotation);
        }
      }

      // Check for simple assignment: x := ...
      // Pattern: IDENT ASSIGN ...
      if (i < this.tokens.length && this.tokens[i].type === TokenType.ASSIGN) {
        const name = this.advance().value;
        this.advance(); // consume ':='
        const value = this.expression();
        return new AssignStmt(name, value, null);
      }

      // Check for mutation: x = expr or x.y = expr or x.y.z = expr
      // Pattern: IDENT (DOT IDENT)* MUTATE ...
      // We need to scan ahead to find if there's a '=' after a member expression
      if (i < this.tokens.length && this.tokens[i].type === TokenType.MUTATE) {
        // Simple variable mutation: x = value
        const name = this.advance().value; // consume IDENT
        this.advance(); // consume '='
        const value = this.expression();
        return new AssignExpr(new Identifier(name), value);
      }

      // Check for member mutation: obj.prop = value or obj.prop.nested = value
      // Pattern: IDENT DOT IDENT (DOT IDENT)* MUTATE ...
      let j = i;
      let hasMemberAccess = false;
      while (j < this.tokens.length) {
        if (this.tokens[j].type === TokenType.DOT) {
          hasMemberAccess = true;
          j++; // skip '.'
          if (j < this.tokens.length && this.tokens[j].type === TokenType.IDENT) {
            j++; // skip property name
          } else {
            break; // Invalid pattern
          }
        } else if (this.tokens[j].type === TokenType.MUTATE) {
          // Found '=' after member access!
          if (hasMemberAccess) {
            // Parse as member mutation
            const target = this.expression(); // Parses obj.prop or obj.prop.nested
            if (!this.check(TokenType.MUTATE)) {
              this.error(this.peek(), `Expected '=' for mutation`);
            }
            this.advance(); // consume '='
            const value = this.expression();
            return new AssignExpr(target, value);
          }
          break;
        } else {
          break; // Not a member mutation pattern
        }
      }
    }

    // Otherwise, it's an expression
    return this.expression();
  }

  /**
   * Parse a type annotation (e.g., "float", "int", "float[]", "int[][]")
   */
  parseTypeAnnotation() {
    let annotation = this.advance().value; // type name

    // Handle array type suffix: []
    while (this.check(TokenType.LBRACKET)) {
      this.advance(); // consume '['
      if (!this.check(TokenType.RBRACKET)) {
        this.error(this.peek(), `Expected ']' after '[' in type annotation`);
      }
      this.advance(); // consume ']'
      annotation += '[]';
    }

    return annotation;
  }

  /**
   * Expression parsing (operator precedence)
   * Precedence (low to high):
   *   |> (pipeline)
   *   || (logical OR)
   *   && (logical AND)
   *   == != (equality)
   *   < > <= >= (comparison)
   *   + - (additive)
   *   * / % (multiplicative)
   *   ! - (unary)
   *   call/member (postfix)
   *   primary
   */

  expression() {
    return this.pipe();
  }

  // Pipeline: |>
  pipe() {
    let left = this.or();

    while (this.match(TokenType.PIPE)) {
      const right = this.or();
      left = new PipeExpr(left, right);
    }

    return left;
  }

  // Logical OR: ||
  or() {
    let left = this.and();

    while (this.match(TokenType.OR)) {
      const op = this.previous();
      const right = this.and();
      left = new BinaryExpr(op.type, left, right);
    }

    return left;
  }

  // Logical AND: &&
  and() {
    let left = this.equality();

    while (this.match(TokenType.AND)) {
      const op = this.previous();
      const right = this.equality();
      left = new BinaryExpr(op.type, left, right);
    }

    return left;
  }

  // Equality: == !=
  equality() {
    let left = this.comparison();

    while (this.match(TokenType.EQ, TokenType.NEQ)) {
      const op = this.previous();
      const right = this.comparison();
      left = new BinaryExpr(op.type, left, right);
    }

    return left;
  }

  // Comparison: < > <= >=
  comparison() {
    let left = this.additive();

    while (this.match(TokenType.LT, TokenType.GT, TokenType.LTE, TokenType.GTE)) {
      const op = this.previous();
      const right = this.additive();
      left = new BinaryExpr(op.type, left, right);
    }

    return left;
  }

  // Additive: + -
  additive() {
    let left = this.multiplicative();

    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const op = this.previous();
      const right = this.multiplicative();
      left = new BinaryExpr(op.type, left, right);
    }

    return left;
  }

  // Multiplicative: * / %
  multiplicative() {
    let left = this.unary();

    while (this.match(TokenType.STAR, TokenType.SLASH, TokenType.PERCENT)) {
      const op = this.previous();
      const right = this.unary();
      left = new BinaryExpr(op.type, left, right);
    }

    return left;
  }

  // Unary: ! -
  unary() {
    if (this.match(TokenType.NOT, TokenType.MINUS)) {
      const op = this.previous();
      const operand = this.unary();
      return new UnaryExpr(op.type, operand);
    }

    return this.callMember();
  }

  // Call and member access: obj.method(), obj.prop
  callMember() {
    let expr = this.primary();

    while (true) {
      if (this.match(TokenType.LPAREN)) {
        expr = this.finishCall(expr);
      } else if (this.match(TokenType.DOT)) {
        if (!this.check(TokenType.IDENT)) {
          this.error(this.peek(), `Expected property name after '.'`);
        }
        const prop = this.advance().value;
        expr = new MemberExpr(expr, prop);
      } else {
        break;
      }
    }

    return expr;
  }

  // Finish parsing function call arguments
  finishCall(callee) {
    const args = [];

    if (!this.check(TokenType.RPAREN)) {
      do {
        args.push(this.expression());
      } while (this.match(TokenType.COMMA));
    }

    if (!this.match(TokenType.RPAREN)) {
      this.error(this.peek(), `Expected ')' after arguments`);
    }

    return new CallExpr(callee, args);
  }

  // Primary: literals, identifiers, arrays, blocks, grouped expressions, arrow functions
  primary() {
    // Number literal
    if (this.check(TokenType.NUMBER)) {
      const token = this.advance();
      return new NumberLiteral(token.value, token.raw);
    }

    // String literal
    if (this.check(TokenType.STRING)) {
      const token = this.advance();
      return new StringLiteral(token.value);
    }

    // Bool literal
    if (this.check(TokenType.BOOL)) {
      const token = this.advance();
      return new BoolLiteral(token.value);
    }

    // Null literal
    if (this.check(TokenType.NULL)) {
      this.advance();
      return new NullLiteral();
    }

    // Identifier or single-param arrow function: x => body
    if (this.check(TokenType.IDENT)) {
      const token = this.advance();

      // Check if this is a single-param arrow function: x => ...
      if (this.check(TokenType.ARROW)) {
        this.advance(); // consume '=>'

        // Parse body (can be block or single expression)
        let body;
        if (this.check(TokenType.LBRACE)) {
          body = this.block();
        } else {
          body = this.expression();
        }

        return new FuncExpr([token.value], body, null);
      }

      return new Identifier(token.value);
    }

    // Array literal: [expr1, expr2, ...]
    if (this.match(TokenType.LBRACKET)) {
      const elements = [];

      if (!this.check(TokenType.RBRACKET)) {
        do {
          elements.push(this.expression());
        } while (this.match(TokenType.COMMA));
      }

      if (!this.match(TokenType.RBRACKET)) {
        this.error(this.peek(), `Expected ']' after array elements`);
      }

      return new ArrayLiteral(elements);
    }

    // Record literal: { key1: val1, key2: val2, ... }
    // Must distinguish from control blocks like { if ... } or { for ... }
    if (this.check(TokenType.LBRACE)) {
      // Look ahead to see if this is a record literal
      const saved = this.current;
      this.advance(); // Skip '{'

      // Skip newlines
      while (this.check(TokenType.NEWLINE)) {
        this.advance();
      }

      // Check if next token is IDENT followed by COLON (record field)
      const isRecord = this.check(TokenType.IDENT) &&
        this.current + 1 < this.tokens.length &&
        this.tokens[this.current + 1].type === TokenType.COLON;

      this.current = saved; // Restore position

      if (isRecord) {
        this.advance(); // consume '{'

        const fields = [];

        if (!this.check(TokenType.RBRACE)) {
          do {
            // Skip newlines
            while (this.match(TokenType.NEWLINE)) {}

            // Parse field key (must be identifier)
            if (!this.check(TokenType.IDENT)) {
              this.error(this.peek(), `Expected identifier as record field key`);
            }

            const key = this.advance().value;

            // Expect ':' after key
            if (!this.match(TokenType.COLON)) {
              this.error(this.peek(), `Expected ':' after record field key`);
            }

            // Parse field value
            const value = this.expression();
            fields.push({ key, value });

            // Skip newlines before comma
            while (this.match(TokenType.NEWLINE)) {}
          } while (this.match(TokenType.COMMA));
        }

        if (!this.match(TokenType.RBRACE)) {
          this.error(this.peek(), `Expected '}' after record fields`);
        }

        return new RecordLiteral(fields);
      }
      // Otherwise fall through to block parsing
    }

    // Block: { stmt1; stmt2; ... }
    if (this.match(TokenType.LBRACE)) {
      return this.block();
    }

    // Grouped expression or arrow function: (...)
    if (this.match(TokenType.LPAREN)) {
      // Try to parse as arrow function first
      const arrowFunction = this.tryParseArrowFunction();
      if (arrowFunction) {
        return arrowFunction;
      }

      // Otherwise, it's a grouped expression
      const expr = this.expression();

      if (!this.match(TokenType.RPAREN)) {
        this.error(this.peek(), `Expected ')' after expression`);
      }

      return expr;
    }

    this.error(this.peek(), `Unexpected token in expression`);
  }

  /**
   * Try to parse arrow function: (params) => body or (params): ReturnType => body
   * Returns null if not an arrow function
   */
  tryParseArrowFunction() {
    const savedPos = this.current;

    // Parse parameter list
    const params = this.parseParamList();

    if (params === null) {
      this.current = savedPos;
      return null;
    }

    // Check for return type annotation: : Type
    let returnAnnotation = null;
    if (this.check(TokenType.COLON)) {
      // Look ahead to see if next is IDENT (type name) followed by =>
      const nextIdx = this.current + 1;
      if (nextIdx < this.tokens.length && this.tokens[nextIdx].type === TokenType.IDENT) {
        this.advance(); // consume ':'
        returnAnnotation = this.parseTypeAnnotation();
      }
    }

    // Check for =>
    if (!this.match(TokenType.ARROW)) {
      this.current = savedPos;
      return null;
    }

    // Parse body (can be block or single expression)
    let body;
    if (this.check(TokenType.LBRACE)) {
      body = this.block();
    } else {
      body = this.expression();
    }

    return new FuncExpr(params, body, returnAnnotation);
  }

  /**
   * Parse parameter list: (a, b) or (a: float, b: int)
   * Returns array of string | {name: string, annotation: string}
   * Returns null if not a valid param list
   */
  parseParamList() {
    const params = [];

    if (this.check(TokenType.RPAREN)) {
      this.advance(); // consume ')'
      return params; // Empty param list
    }

    do {
      if (!this.check(TokenType.IDENT)) {
        return null;
      }

      const name = this.advance().value;

      // Check for type annotation: param : type
      let annotation = null;
      if (this.check(TokenType.COLON)) {
        // Look ahead to verify next is type identifier
        const nextIdx = this.current + 1;
        if (nextIdx < this.tokens.length && this.tokens[nextIdx].type === TokenType.IDENT) {
          this.advance(); // consume ':'
          annotation = this.parseTypeAnnotation();
        }
      }

      if (annotation) {
        params.push({ name, annotation });
      } else {
        params.push(name);
      }
    } while (this.match(TokenType.COMMA));

    if (!this.match(TokenType.RPAREN)) {
      return null;
    }

    return params;
  }

  /**
   * Parse block: { stmt1; stmt2; ... }
   */
  block() {
    const stmts = [];

    // Consume the opening '{'
    if (!this.match(TokenType.LBRACE)) {
      this.error(this.peek(), `Expected '{' to start block`);
    }

    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      // Skip newlines
      while (this.match(TokenType.NEWLINE)) {
        // Skip
      }

      if (this.check(TokenType.RBRACE)) break;

      stmts.push(this.statement());
    }

    if (!this.match(TokenType.RBRACE)) {
      this.error(this.peek(), `Expected '}' after block`);
    }

    return new BlockExpr(stmts);
  }

  /**
   * Parse if statement: if cond { then } else { else }
   */
  parseIfStatement() {
    this.advance(); // consume 'if'

    // Parse condition
    const cond = this.expression();

    // Parse then block
    if (!this.check(TokenType.LBRACE)) {
      this.error(this.peek(), `Expected '{' after if condition`);
    }
    const then = this.block();

    // Parse else block (optional)
    let else_ = null;
    if (this.check(TokenType.IDENT) && this.peek().value === 'else') {
      this.advance(); // consume 'else'

      if (!this.check(TokenType.LBRACE)) {
        this.error(this.peek(), `Expected '{' after else`);
      }
      else_ = this.block();
    }

    return new IfExpr(cond, then, else_);
  }

  /**
   * Parse for loop: for var in iterable { body }
   */
  parseForLoop() {
    this.advance(); // consume 'for'

    // Parse variable name
    if (!this.check(TokenType.IDENT)) {
      this.error(this.peek(), `Expected variable name after 'for'`);
    }
    const varName = this.advance().value;

    // Expect 'in'
    if (!this.check(TokenType.IDENT) || this.peek().value !== 'in') {
      this.error(this.peek(), `Expected 'in' after for loop variable`);
    }
    this.advance(); // consume 'in'

    // Parse iterable expression
    const iterable = this.expression();

    // Parse body block
    if (!this.check(TokenType.LBRACE)) {
      this.error(this.peek(), `Expected '{' after for loop iterable`);
    }
    const body = this.block();

    return new ForLoop(varName, iterable, body);
  }

  parseWhileLoop() {
    this.advance(); // consume 'while'

    // Parse condition
    const cond = this.expression();

    // Parse body block
    if (!this.check(TokenType.LBRACE)) {
      this.error(this.peek(), `Expected '{' after while condition`);
    }
    const body = this.block();

    return new WhileLoop(cond, body);
  }

  match(...types) {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  check(type) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  advance() {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  isAtEnd() {
    return this.peek().type === TokenType.EOF;
  }

  peek() {
    return this.tokens[this.current];
  }

  previous() {
    return this.tokens[this.current - 1];
  }

  error(token, message) {
    throw new Error(`[Parser Error] Line ${token.line}, Column ${token.column}: ${message}`);
  }
}

module.exports = Parser;
