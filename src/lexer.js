/**
 * Kai Lexer - Tokenizer for .kai source code
 * Converts source code string into a stream of tokens
 */

// Token type constants
const TokenType = {
  // Literals
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  BOOL: 'BOOL',
  NULL: 'NULL',

  // Identifiers and keywords
  IDENT: 'IDENT',

  // Operators
  ASSIGN: ':=',
  MUTATE: '=',
  ARROW: '=>',
  PLUS: '+',
  MINUS: '-',
  STAR: '*',
  SLASH: '/',
  PERCENT: '%',

  // Comparison
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  GT: '>',
  LTE: '<=',
  GTE: '>=',

  // Logical
  AND: '&&',
  OR: '||',
  NOT: '!',

  // Pipeline
  PIPE: '|>',

  // Delimiters
  LPAREN: '(',
  RPAREN: ')',
  LBRACE: '{',
  RBRACE: '}',
  LBRACKET: '[',
  RBRACKET: ']',
  COMMA: ',',
  DOT: '.',
  COLON: ':',

  // Other
  NEWLINE: 'NEWLINE',
  EOF: 'EOF',
};

class Token {
  constructor(type, value, line, column, raw = null) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
    this.raw = raw; // For NUMBER: stores original string (e.g., "1.0" vs "1")
  }

  toString() {
    let str = `${this.type}`;
    if (this.value !== null) {
      str += `(${this.value})`;
    }
    return str;
  }
}

class Lexer {
  constructor(source) {
    this.source = source;
    this.start = 0;
    this.current = 0;
    this.line = 1;
    this.column = 1;
    this.tokens = [];
  }

  /**
   * Tokenize the entire source code
   */
  tokenize() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, null, this.line, this.column));
    return this.tokens;
  }

  /**
   * Scan a single token
   */
  scanToken() {
    const char = this.advance();

    switch (char) {
      // Whitespace
      case ' ':
      case '\t':
      case '\r':
        break;

      // Newline
      case '\n':
        this.tokens.push(new Token(TokenType.NEWLINE, '\n', this.line, this.column));
        this.line++;
        this.column = 1;
        break;

      // Comments
      case '#':
        this.comment();
        break;

      // String literals
      case '"':
        this.string();
        break;

      // Single-character tokens
      case '(':
        this.addToken(TokenType.LPAREN);
        break;
      case ')':
        this.addToken(TokenType.RPAREN);
        break;
      case '{':
        this.addToken(TokenType.LBRACE);
        break;
      case '}':
        this.addToken(TokenType.RBRACE);
        break;
      case '[':
        this.addToken(TokenType.LBRACKET);
        break;
      case ']':
        this.addToken(TokenType.RBRACKET);
        break;
      case ',':
        this.addToken(TokenType.COMMA);
        break;
      case '.':
        this.addToken(TokenType.DOT);
        break;
      case ':':
        if (this.match('=')) {
          this.addToken(TokenType.ASSIGN);
        } else {
          this.addToken(TokenType.COLON);
        }
        break;
      case ';':
        // Ignore semicolons (optional in Kai)
        break;

      // Operators
      case '+':
        this.addToken(TokenType.PLUS);
        break;
      case '-':
        this.addToken(TokenType.MINUS);
        break;
      case '*':
        this.addToken(TokenType.STAR);
        break;
      case '/':
        this.addToken(TokenType.SLASH);
        break;
      case '%':
        this.addToken(TokenType.PERCENT);
        break;
      case '!':
        if (this.match('=')) {
          this.addToken(TokenType.NEQ);
        } else {
          this.addToken(TokenType.NOT);
        }
        break;
      case '=':
        if (this.match('=')) {
          this.addToken(TokenType.EQ);
        } else if (this.peek() === '>') {
          // We have '=>' - convert to ARROW token
          this.advance(); // consume '>'
          this.addToken(TokenType.ARROW);
        } else {
          // Single '=' is mutation operator (v0.4.0)
          this.addToken(TokenType.MUTATE);
        }
        break;
      case '<':
        if (this.match('=')) {
          this.addToken(TokenType.LTE);
        } else {
          this.addToken(TokenType.LT);
        }
        break;
      case '>':
        if (this.match('=')) {
          this.addToken(TokenType.GTE);
        } else {
          this.addToken(TokenType.GT);
        }
        break;
      case '&':
        if (this.match('&')) {
          this.addToken(TokenType.AND);
        } else {
          this.error(`Unexpected '&'. Use '&&' for logical AND.`);
        }
        break;
      case '|':
        if (this.match('>')) {
          this.addToken(TokenType.PIPE);
        } else if (this.match('|')) {
          this.addToken(TokenType.OR);
        } else {
          this.error(`Unexpected '|'. Use '|>' for pipeline or '||' for logical OR.`);
        }
        break;

      default:
        // Numbers or identifiers
        if (this.isDigit(char)) {
          this.number();
        } else if (this.isAlpha(char)) {
          this.identifier();
        } else {
          this.error(`Unexpected character: '${char}'`);
        }
    }
  }

  /**
   * Handle comments (# to end of line)
   */
  comment() {
    while (this.peek() !== '\n' && !this.isAtEnd()) {
      this.advance();
    }
  }

  /**
   * Handle string literals
   */
  string() {
    const value = [];

    while (this.peek() !== '"' && !this.isAtEnd()) {
      const char = this.peek();

      // Handle escape sequences
      if (char === '\\') {
        this.advance();
        const next = this.peek();

        switch (next) {
          case 'n':
            value.push('\n');
            break;
          case 't':
            value.push('\t');
            break;
          case '\\':
            value.push('\\');
            break;
          case '"':
            value.push('"');
            break;
          default:
            this.error(`Invalid escape sequence: '\\${next}'`);
        }

        this.advance();
      } else {
        value.push(this.advance());
      }
    }

    if (this.isAtEnd()) {
      this.error('Unterminated string');
    }

    this.advance(); // Closing "

    this.tokens.push(
      new Token(TokenType.STRING, value.join(''), this.line, this.column)
    );
  }

  /**
   * Handle number literals (both int and float)
   * Stores both the value (as number) and raw string (for type checking)
   */
  number() {
    const startLine = this.line;
    const startColumn = this.column;

    while (this.isDigit(this.peek())) {
      this.advance();
    }

    // Check for decimal point
    if (this.peek() === '.' && this.isDigit(this.peekNext())) {
      this.advance(); // Consume '.'

      while (this.isDigit(this.peek())) {
        this.advance();
      }
    }

    const raw = this.source.substring(this.start, this.current);
    const value = parseFloat(raw);

    this.tokens.push(
      new Token(TokenType.NUMBER, value, startLine, startColumn, raw)
    );
  }

  /**
   * Handle identifiers and keywords
   */
  identifier() {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    const text = this.source.substring(this.start, this.current);

    // Check for keywords
    switch (text) {
      case 'true':
        this.tokens.push(new Token(TokenType.BOOL, true, this.line, this.column));
        break;
      case 'false':
        this.tokens.push(new Token(TokenType.BOOL, false, this.line, this.column));
        break;
      case 'null':
        this.tokens.push(new Token(TokenType.NULL, null, this.line, this.column));
        break;
      default:
        this.tokens.push(new Token(TokenType.IDENT, text, this.line, this.column));
    }
  }

  /**
   * Helper methods
   */
  advance() {
    const char = this.source.charAt(this.current);
    this.current++;
    this.column++;
    return char;
  }

  peek() {
    if (this.isAtEnd()) return '\0';
    return this.source.charAt(this.current);
  }

  peekNext() {
    if (this.current + 1 >= this.source.length) return '\0';
    return this.source.charAt(this.current + 1);
  }

  match(expected) {
    if (this.isAtEnd()) return false;
    if (this.source.charAt(this.current) !== expected) return false;

    this.current++;
    this.column++;
    return true;
  }

  isAtEnd() {
    return this.current >= this.source.length;
  }

  isDigit(char) {
    return char >= '0' && char <= '9';
  }

  isAlpha(char) {
    return (char >= 'a' && char <= 'z') ||
           (char >= 'A' && char <= 'Z') ||
           char === '_';
  }

  isAlphaNumeric(char) {
    return this.isAlpha(char) || this.isDigit(char);
  }

  addToken(type, value = null) {
    this.tokens.push(
      new Token(type, value, this.line, this.column)
    );
  }

  error(message) {
    throw new Error(`[Lexer Error] Line ${this.line}, Column ${this.column}: ${message}`);
  }
}

module.exports = { TokenType, Token, Lexer };
