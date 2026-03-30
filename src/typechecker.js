/**
 * Kai Type Checker - Gradual Type System
 * Performs type checking and type inference
 */

// Type classes
class Type {
  equals(other) {
    return this.constructor === other.constructor && this.toString() === other.toString();
  }

  toString() {
    return this.constructor.name;
  }

  isNumeric() {
    return this instanceof PrimitiveType &&
           (this.name === 'int' || this.name === 'float' ||
            this.name === 'int32' || this.name === 'float32');
  }

  isFloat() {
    return this instanceof PrimitiveType &&
           (this.name === 'float' || this.name === 'float32');
  }

  isInt() {
    return this instanceof PrimitiveType &&
           (this.name === 'int' || this.name === 'int32');
  }
}

class PrimitiveType extends Type {
  constructor(name) {
    super();
    this.name = name;
  }

  toString() {
    return this.name;
  }
}

class ArrayType extends Type {
  constructor(element) {
    super();
    this.element = element;
  }

  toString() {
    return `${this.element}[]`;
  }

  equals(other) {
    return other instanceof ArrayType && this.element.equals(other.element);
  }
}

class TensorType extends Type {
  constructor(element, shape) {
    super();
    this.element = element;
    this.shape = shape; // Array of integers, -1 for dynamic dimensions
  }

  toString() {
    const shapeStr = this.shape.map(s => s === -1 ? '?' : s).join(', ');
    return `Tensor[${this.element}, (${shapeStr})]`;
  }

  equals(other) {
    if (!(other instanceof TensorType)) return false;
    if (!this.element.equals(other.element)) return false;
    if (this.shape.length !== other.shape.length) return false;
    for (let i = 0; i < this.shape.length; i++) {
      if (this.shape[i] !== other.shape[i] && this.shape[i] !== -1 && other.shape[i] !== -1) {
        return false;
      }
    }
    return true;
  }
}

class FunctionType extends Type {
  constructor(params, ret) {
    super();
    this.params = params; // Type[]
    this.ret = ret; // Type
  }

  toString() {
    const paramsStr = this.params.map(p => p.toString()).join(', ');
    return `(${paramsStr}) -> ${this.ret}`;
  }

  equals(other) {
    if (!(other instanceof FunctionType)) return false;
    if (this.params.length !== other.params.length) return false;
    for (let i = 0; i < this.params.length; i++) {
      if (!this.params[i].equals(other.params[i])) return false;
    }
    return this.ret.equals(other.ret);
  }
}

class UnionType extends Type {
  constructor(types) {
    super();
    this.types = types;
  }

  toString() {
    return this.types.map(t => t.toString()).join(' | ');
  }
}

// Singleton type instances
const T_INT = new PrimitiveType('int');
const T_INT32 = new PrimitiveType('int32');
const T_FLOAT = new PrimitiveType('float');
const T_FLOAT32 = new PrimitiveType('float32');
const T_BOOL = new PrimitiveType('bool');
const T_STR = new PrimitiveType('str');
const T_NULL = new PrimitiveType('null');
const T_ANY = new PrimitiveType('any');
const T_VOID = new PrimitiveType('void');

class TypeError_ {
  constructor(line, column, message) {
    this.line = line;
    this.column = column;
    this.message = message;
  }

  toString() {
    return `[TypeError] Line ${this.line}, Column ${this.column}: ${this.message}`;
  }
}

class TypeChecker {
  constructor() {
    this.errors = [];
    this.currentEnv = null;
  }

  /**
   * Type check an AST
   */
  check(ast) {
    this.errors = [];
    this.currentEnv = this.createBaseEnv();

    this.checkNode(ast, this.currentEnv);

    return this.errors;
  }

  createBaseEnv() {
    return new Map([
      // Primitive types
      ['int', T_INT],
      ['int32', T_INT32],
      ['float', T_FLOAT],
      ['float32', T_FLOAT32],
      ['bool', T_BOOL],
      ['str', T_STR],
      ['null', T_NULL],
      ['any', T_ANY],
    ]);
  }

  checkNode(node, env) {
    switch (node.type) {
      case 'Program':
        return this.checkProgram(node, env);
      case 'NumberLiteral':
        return this.checkNumberLiteral(node);
      case 'StringLiteral':
        return T_STR;
      case 'BoolLiteral':
        return T_BOOL;
      case 'NullLiteral':
        return T_NULL;
      case 'ArrayLiteral':
        return this.checkArrayLiteral(node, env);
      case 'Identifier':
        return this.checkIdentifier(node, env);
      case 'BinaryExpr':
        return this.checkBinaryExpr(node, env);
      case 'UnaryExpr':
        return this.checkUnaryExpr(node, env);
      case 'AssignStmt':
        return this.checkAssignStmt(node, env);
      case 'FuncExpr':
        return this.checkFuncExpr(node, env);
      case 'CallExpr':
        return this.checkCallExpr(node, env);
      case 'MemberExpr':
        return this.checkMemberExpr(node, env);
      case 'BlockExpr':
        return this.checkBlockExpr(node, env);
      case 'ReturnStmt':
        return this.checkReturnStmt(node, env);
      case 'PipeExpr':
        return this.checkPipeExpr(node, env);
      default:
        return T_ANY;
    }
  }

  checkProgram(node, env) {
    let lastType = T_VOID;
    for (const stmt of node.body) {
      lastType = this.checkNode(stmt, env);
    }
    return lastType;
  }

  checkNumberLiteral(node) {
    // Use raw string to distinguish int from float
    if (node.raw && node.raw.includes('.')) {
      node._type = T_FLOAT;
      return T_FLOAT;
    }
    node._type = T_INT;
    return T_INT;
  }

  checkArrayLiteral(node, env) {
    if (node.elements.length === 0) {
      node._type = new ArrayType(T_ANY);
      return node._type;
    }

    const elementTypes = node.elements.map(el => this.checkNode(el, env));
    const commonType = this.findCommonType(elementTypes);

    node._type = new ArrayType(commonType);
    return node._type;
  }

  findCommonType(types) {
    if (types.length === 0) return T_ANY;

    let common = types[0];
    for (let i = 1; i < types.length; i++) {
      common = this.unify(common, types[i]);
      if (common === T_ANY) break;
    }
    return common;
  }

  checkIdentifier(node, env) {
    if (!env.has(node.name)) {
      node._type = T_ANY;
      return T_ANY;
    }

    node._type = env.get(node.name);
    return node._type;
  }

  checkBinaryExpr(node, env) {
    const leftType = this.checkNode(node.left, env);
    const rightType = this.checkNode(node.right, env);

    // Arithmetic operators
    if (['+', '-', '*', '/', '%'].includes(node.op)) {
      if (leftType.isNumeric() && rightType.isNumeric()) {
        // int + int = int, int + float = float
        const resultType = (leftType.isFloat() || rightType.isFloat()) ? T_FLOAT : T_INT;
        node._type = resultType;
        return resultType;
      }
      // string + string = string
      if (node.op === '+' && leftType === T_STR && rightType === T_STR) {
        node._type = T_STR;
        return T_STR;
      }
      node._type = T_ANY;
      return T_ANY;
    }

    // Comparison operators
    if (['==', '!=', '<', '>', '<=', '>='].includes(node.op)) {
      node._type = T_BOOL;
      return T_BOOL;
    }

    // Logical operators
    if (['&&', '||'].includes(node.op)) {
      node._type = T_BOOL;
      return T_BOOL;
    }

    node._type = T_ANY;
    return T_ANY;
  }

  checkUnaryExpr(node, env) {
    const operandType = this.checkNode(node.operand, env);

    if (node.op === '!') {
      node._type = T_BOOL;
      return T_BOOL;
    }

    if (node.op === '-') {
      if (operandType.isNumeric()) {
        node._type = operandType;
        return operandType;
      }
    }

    node._type = T_ANY;
    return T_ANY;
  }

  checkAssignStmt(node, env) {
    const valueType = this.checkNode(node.value, env);

    // If there's a type annotation, check it
    if (node.annotation) {
      const annotatedType = this.parseAnnotation(node.annotation);
      if (!this.assignable(valueType, annotatedType)) {
        this.errors.push(new TypeError_(
          node.value._line || 0,
          node.value._column || 0,
          `Variable '${node.name}' declared as ${annotatedType} but assigned ${valueType}`
        ));
      }
      node._type = annotatedType;
    } else {
      node._type = valueType;
    }

    env.set(node.name, node._type);
    return node._type;
  }

  checkFuncExpr(node, env) {
    // Create new environment for function body
    const funcEnv = new Map(env);

    // Type check parameters
    const paramTypes = [];
    for (const param of node.params) {
      let paramType;
      let paramName;

      if (typeof param === 'string') {
        paramName = param;
        paramType = T_ANY; // No annotation, infer as any
      } else {
        paramName = param.name;
        paramType = this.parseAnnotation(param.annotation);
      }

      paramTypes.push(paramType);
      funcEnv.set(paramName, paramType);
    }

    // Type check body
    const bodyType = this.checkNode(node.body, funcEnv);

    // If there's a return type annotation, check it
    let returnType = bodyType;
    if (node.returnAnnotation) {
      const annotatedReturn = this.parseAnnotation(node.returnAnnotation);
      if (!this.assignable(bodyType, annotatedReturn)) {
        this.errors.push(new TypeError_(
          node.body._line || 0,
          node.body._column || 0,
          `Function declared to return ${annotatedReturn} but returns ${bodyType}`
        ));
      }
      returnType = annotatedReturn;
    }

    const funcType = new FunctionType(paramTypes, returnType);
    node._type = funcType;
    return funcType;
  }

  checkCallExpr(node, env) {
    const calleeType = this.checkNode(node.callee, env);
    const argTypes = node.args.map(arg => this.checkNode(arg, env));

    if (calleeType instanceof FunctionType) {
      // Check arity
      if (calleeType.params.length !== argTypes.length) {
        this.errors.push(new TypeError_(
          node.callee._line || 0,
          node.callee._column || 0,
          `Function expects ${calleeType.params.length} arguments but got ${argTypes.length}`
        ));
      }

      // Check argument types
      for (let i = 0; i < Math.min(argTypes.length, calleeType.params.length); i++) {
        if (!this.assignable(argTypes[i], calleeType.params[i])) {
          this.errors.push(new TypeError_(
            node.args[i]._line || 0,
            node.args[i]._column || 0,
            `Argument ${i + 1} expects ${calleeType.params[i]} but got ${argTypes[i]}`
          ));
        }
      }

      node._type = calleeType.ret;
      return calleeType.ret;
    }

    // Callable but not a function type (e.g., built-in)
    node._type = T_ANY;
    return T_ANY;
  }

  checkMemberExpr(node, env) {
    const objType = this.checkNode(node.obj, env);

    if (objType instanceof ArrayType) {
      // Array methods
      if (['map', 'filter', 'reduce', 'sum', 'mean', 'min', 'max', 'length',
           'sort', 'reverse', 'head', 'tail', 'unique', 'includes'].includes(node.prop)) {
        node._type = T_ANY;
        return T_ANY;
      }
    }

    if (objType === T_STR) {
      // String methods
      if (['trim', 'upper', 'lower', 'split', 'includes', 'length'].includes(node.prop)) {
        node._type = T_ANY;
        return T_ANY;
      }
    }

    node._type = T_ANY;
    return T_ANY;
  }

  checkBlockExpr(node, env) {
    const blockEnv = new Map(env);
    let lastType = T_VOID;

    for (const stmt of node.stmts) {
      lastType = this.checkNode(stmt, blockEnv);
    }

    node._type = lastType;
    return lastType;
  }

  checkReturnStmt(node, env) {
    if (node.value) {
      return this.checkNode(node.value, env);
    }
    return T_VOID;
  }

  checkPipeExpr(node, env) {
    const leftType = this.checkNode(node.left, env);
    const rightType = this.checkNode(node.right, env);

    // The right side should be callable (function)
    if (rightType instanceof FunctionType) {
      // Check if left type is assignable to first parameter
      if (rightType.params.length > 0) {
        if (!this.assignable(leftType, rightType.params[0])) {
          this.errors.push(new TypeError_(
            node.left._line || 0,
            node.left._column || 0,
            `Pipeline left side ${leftType} not assignable to function parameter ${rightType.params[0]}`
          ));
        }
      }
      node._type = rightType.ret;
      return rightType.ret;
    }

    node._type = T_ANY;
    return T_ANY;
  }

  /**
   * Parse type annotation string into Type object
   */
  parseAnnotation(annotation) {
    // Check for array type: Type[]
    if (annotation.endsWith('[]')) {
      const baseAnnotation = annotation.slice(0, -2);
      const baseType = this.parseAnnotation(baseAnnotation);
      return new ArrayType(baseType);
    }

    // Check for tensor type: Tensor[type, (shape)]
    const tensorMatch = annotation.match(/^Tensor\[(\w+),\s*\(([^)]+)\)\]$/);
    if (tensorMatch) {
      const elementType = this.parseAnnotation(tensorMatch[1]);
      const shape = tensorMatch[2].split(',').map(s => s.trim() === '?' ? -1 : parseInt(s));
      return new TensorType(elementType, shape);
    }

    // Primitive types
    switch (annotation) {
      case 'int': return T_INT;
      case 'int32': return T_INT32;
      case 'float': return T_FLOAT;
      case 'float32': return T_FLOAT32;
      case 'bool': return T_BOOL;
      case 'str': return T_STR;
      case 'null': return T_NULL;
      case 'any': return T_ANY;
      case 'void': return T_VOID;
      default: return T_ANY;
    }
  }

  /**
   * Check if a value can be assigned to a variable of the given type
   */
  assignable(from, to) {
    if (to === T_ANY) return true;
    if (from.equals(to)) return true;

    // Widening: int can be assigned to float
    if (from.isInt() && to.isFloat()) return true;

    // Array subtyping
    if (from instanceof ArrayType && to instanceof ArrayType) {
      return this.assignable(from.element, to.element);
    }

    // Function subtyping
    if (from instanceof FunctionType && to instanceof FunctionType) {
      if (from.params.length !== to.params.length) return false;
      // Contravariant parameters
      for (let i = 0; i < from.params.length; i++) {
        if (!this.assignable(to.params[i], from.params[i])) return false;
      }
      // Covariant return
      return this.assignable(from.ret, to.ret);
    }

    return false;
  }

  /**
   * Find common type (unification)
   */
  unify(a, b) {
    if (a.equals(b)) return a;
    if (a === T_ANY || b === T_ANY) return T_ANY;

    // Numeric unification: int + float = float
    if (a.isNumeric() && b.isNumeric()) {
      if (a.isFloat() || b.isFloat()) return T_FLOAT;
      return T_INT;
    }

    // Array unification
    if (a instanceof ArrayType && b instanceof ArrayType) {
      const element = this.unify(a.element, b.element);
      return new ArrayType(element);
    }

    return T_ANY;
  }
}

module.exports = {
  Type,
  PrimitiveType,
  ArrayType,
  TensorType,
  FunctionType,
  UnionType,
  T_INT,
  T_INT32,
  T_FLOAT,
  T_FLOAT32,
  T_BOOL,
  T_STR,
  T_NULL,
  T_ANY,
  T_VOID,
  TypeError_,
  TypeChecker,
};
