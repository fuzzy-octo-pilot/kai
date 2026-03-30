/**
 * Kai AST - Abstract Syntax Tree Node Definitions
 */

// Base class for all AST nodes
class ASTNode {
  constructor(type) {
    this.type = type;
    this._type = null; // Will be set by type checker
  }
}

// Literals
class NumberLiteral extends ASTNode {
  constructor(value, raw) {
    super('NumberLiteral');
    this.value = value;
    this.raw = raw; // Original string (e.g., "1.0" vs "1")
  }
}

class StringLiteral extends ASTNode {
  constructor(value) {
    super('StringLiteral');
    this.value = value;
  }
}

class BoolLiteral extends ASTNode {
  constructor(value) {
    super('BoolLiteral');
    this.value = value;
  }
}

class NullLiteral extends ASTNode {
  constructor() {
    super('NullLiteral');
  }
}

class ArrayLiteral extends ASTNode {
  constructor(elements) {
    super('ArrayLiteral');
    this.elements = elements; // ASTNode[]
  }
}

class RecordLiteral extends ASTNode {
  constructor(fields) {
    super('RecordLiteral');
    this.fields = fields; // { key: string, value: ASTNode }[]
  }
}

// Identifier
class Identifier extends ASTNode {
  constructor(name) {
    super('Identifier');
    this.name = name;
  }
}

// Expressions
class BinaryExpr extends ASTNode {
  constructor(op, left, right) {
    super('BinaryExpr');
    this.op = op; // TokenType
    this.left = left;
    this.right = right;
  }
}

class UnaryExpr extends ASTNode {
  constructor(op, operand) {
    super('UnaryExpr');
    this.op = op; // TokenType
    this.operand = operand;
  }
}

// Assignment statement: x := value or x: type := value
class AssignStmt extends ASTNode {
  constructor(name, value, annotation = null) {
    super('AssignStmt');
    this.name = name; // string
    this.value = value; // ASTNode
    this.annotation = annotation; // string | null (e.g., "float" or "float[]")
  }
}

// Mutation: x = value (reassign existing variable)
class AssignExpr extends ASTNode {
  constructor(target, value) {
    super('AssignExpr');
    this.target = target; // ASTNode (Identifier or MemberExpr)
    this.value = value; // ASTNode
  }
}

// Function expression: (params) => body or (params): ReturnType => body
class FuncExpr extends ASTNode {
  constructor(params, body, returnAnnotation = null) {
    super('FuncExpr');
    this.params = params; // (string | {name: string, annotation: string})[]
    this.body = body; // ASTNode (can be BlockExpr or single expression)
    this.returnAnnotation = returnAnnotation; // string | null
  }
}

// Function call: func(args)
class CallExpr extends ASTNode {
  constructor(callee, args) {
    super('CallExpr');
    this.callee = callee; // ASTNode (usually Identifier)
    this.args = args; // ASTNode[]
  }
}

// Member access: obj.prop or obj.method()
class MemberExpr extends ASTNode {
  constructor(obj, prop) {
    super('MemberExpr');
    this.obj = obj; // ASTNode
    this.prop = prop; // string (property name)
  }
}

// Block expression: { stmt1; stmt2; ... }
class BlockExpr extends ASTNode {
  constructor(stmts) {
    super('BlockExpr');
    this.stmts = stmts; // ASTNode[]
  }
}

// If expression (not yet parsed, but defined for future use)
class IfExpr extends ASTNode {
  constructor(cond, then, else_) {
    super('IfExpr');
    this.cond = cond; // ASTNode
    this.then = then; // ASTNode
    this.else = else_; // ASTNode | null
  }
}

// Return statement: return value
class ReturnStmt extends ASTNode {
  constructor(value) {
    super('ReturnStmt');
    this.value = value; // ASTNode | null
  }
}

// For loop: for var in iterable { body }
class ForLoop extends ASTNode {
  constructor(varName, iterable, body) {
    super('ForLoop');
    this.varName = varName; // string
    this.iterable = iterable; // ASTNode
    this.body = body; // BlockExpr
  }
}

// While loop: while cond { body }
class WhileLoop extends ASTNode {
  constructor(cond, body) {
    super('WhileLoop');
    this.cond = cond; // ASTNode
    this.body = body; // BlockExpr
  }
}

// Break statement: break
class BreakStmt extends ASTNode {
  constructor() {
    super('BreakStmt');
  }
}

// Continue statement: continue
class ContinueStmt extends ASTNode {
  constructor() {
    super('ContinueStmt');
  }
}

// Pipeline expression: left |> right
class PipeExpr extends ASTNode {
  constructor(left, right) {
    super('PipeExpr');
    this.left = left; // ASTNode
    this.right = right; // ASTNode (should be callable)
  }
}

// Root program node
class Program extends ASTNode {
  constructor(body) {
    super('Program');
    this.body = body; // ASTNode[]
  }
}

module.exports = {
  ASTNode,
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
  Program,
};
