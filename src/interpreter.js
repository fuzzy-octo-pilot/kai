/**
 * Kai Interpreter - Tree-Walking Interpreter
 * Executes AST nodes by recursively evaluating them
 */

const { TokenType } = require('./lexer');

// Special signal for returning from functions
class ReturnSignal {
  constructor(value) {
    this.value = value;
  }
}

// Environment for variable scoping
class Environment {
  constructor(parent = null) {
    this.parent = parent;
    this.vars = {};
  }

  define(name, value) {
    this.vars[name] = value;
  }

  get(name) {
    if (name in this.vars) {
      return this.vars[name];
    }

    if (this.parent) {
      return this.parent.get(name);
    }

    throw new Error(`RuntimeError: Undefined variable '${name}'`);
  }

  set(name, value) {
    if (name in this.vars) {
      this.vars[name] = value;
      return;
    }

    if (this.parent) {
      this.parent.set(name, value);
      return;
    }

    throw new Error(`RuntimeError: Undefined variable '${name}'`);
  }

  child() {
    return new Environment(this);
  }
}

// Wrapper for user-defined functions
class KaiFunction {
  constructor(params, body, closure) {
    this.params = params; // (string | {name, annotation})[]
    this.body = body; // AST node
    this.closure = closure; // Environment
  }

  call(interpreter, args) {
    const env = this.closure.child();

    // Bind parameters to arguments
    for (let i = 0; i < this.params.length; i++) {
      const param = this.params[i];
      const name = typeof param === 'string' ? param : param.name;
      env.define(name, args[i]);
    }

    // Execute function body
    try {
      return interpreter.eval(this.body, env);
    } catch (e) {
      if (e instanceof ReturnSignal) {
        return e.value;
      }
      throw e;
    }
  }
}

class Interpreter {
  constructor() {
    this.globals = this.defineStdlib();
  }

  /**
   * Run a program AST node
   */
  run(ast) {
    return this.eval(ast, this.globals);
  }

  /**
   * Evaluate any AST node
   */
  eval(node, env) {
    switch (node.type) {
      case 'Program':
        return this.evalProgram(node, env);

      case 'NumberLiteral':
      case 'StringLiteral':
      case 'BoolLiteral':
      case 'NullLiteral':
        return node.value;

      case 'ArrayLiteral':
        return this.evalArrayLiteral(node, env);

      case 'Identifier':
        return env.get(node.name);

      case 'BinaryExpr':
        return this.evalBinaryExpr(node, env);

      case 'UnaryExpr':
        return this.evalUnaryExpr(node, env);

      case 'AssignStmt':
        return this.evalAssignStmt(node, env);

      case 'FuncExpr':
        return new KaiFunction(node.params, node.body, env);

      case 'CallExpr':
        return this.evalCallExpr(node, env);

      case 'MemberExpr':
        return this.evalMemberExpr(node, env);

      case 'BlockExpr':
        return this.evalBlockExpr(node, env);

      case 'IfExpr':
        return this.evalIfExpr(node, env);

      case 'ForLoop':
        return this.evalForLoop(node, env);

      case 'ReturnStmt':
        throw new ReturnSignal(node.value ? this.eval(node.value, env) : null);

      case 'PipeExpr':
        return this.evalPipeExpr(node, env);

      default:
        throw new Error(`RuntimeError: Unknown node type: ${node.type}`);
    }
  }

  evalProgram(node, env) {
    let result = null;
    for (const stmt of node.body) {
      result = this.eval(stmt, env);
    }
    return result;
  }

  evalArrayLiteral(node, env) {
    return node.elements.map(el => this.eval(el, env));
  }

  evalBinaryExpr(node, env) {
    const left = this.eval(node.left, env);
    const right = this.eval(node.right, env);

    switch (node.op) {
      // Arithmetic
      case TokenType.PLUS:
        return left + right;
      case TokenType.MINUS:
        return left - right;
      case TokenType.STAR:
        return left * right;
      case TokenType.SLASH:
        return left / right;
      case TokenType.PERCENT:
        return left % right;

      // Comparison
      case TokenType.EQ:
        return left == right;
      case TokenType.NEQ:
        return left != right;
      case TokenType.LT:
        return left < right;
      case TokenType.GT:
        return left > right;
      case TokenType.LTE:
        return left <= right;
      case TokenType.GTE:
        return left >= right;

      // Logical
      case TokenType.AND:
        return left && right;
      case TokenType.OR:
        return left || right;

      default:
        throw new Error(`RuntimeError: Unknown binary operator: ${node.op}`);
    }
  }

  evalUnaryExpr(node, env) {
    const operand = this.eval(node.operand, env);

    switch (node.op) {
      case TokenType.NOT:
        return !operand;
      case TokenType.MINUS:
        return -operand;
      default:
        throw new Error(`RuntimeError: Unknown unary operator: ${node.op}`);
    }
  }

  evalAssignStmt(node, env) {
    const value = this.eval(node.value, env);
    env.define(node.name, value);
    return value;
  }

  evalIfExpr(node, env) {
    const cond = this.eval(node.cond, env);

    // Treat non-null, non-zero, non-false as truthy
    if (cond) {
      return this.eval(node.then, env);
    } else if (node.else) {
      return this.eval(node.else, env);
    }
    return null;
  }

  evalForLoop(node, env) {
    const iterable = this.eval(node.iterable, env);
    const loopEnv = env.child();
    let result = null;

    // Iterate over array
    if (Array.isArray(iterable)) {
      for (const item of iterable) {
        loopEnv.define(node.varName, item);
        result = this.eval(node.body, loopEnv);
      }
    } else {
      throw new Error(`RuntimeError: Cannot iterate over ${typeof iterable}`);
    }

    return result;
  }

  evalCallExpr(node, env) {
    const callee = this.eval(node.callee, env);
    const args = node.args.map(arg => this.eval(arg, env));

    if (callee instanceof KaiFunction) {
      return callee.call(this, args);
    }

    if (typeof callee === 'function') {
      return callee(...args);
    }

    throw new Error(`RuntimeError: '${callee}' is not a function`);
  }

  evalMemberExpr(node, env) {
    const obj = this.eval(node.obj, env);

    // Array methods
    if (Array.isArray(obj)) {
      return this.evalArrayMethod(obj, node.prop, env);
    }

    // String methods
    if (typeof obj === 'string') {
      return this.evalStringMethod(obj, node.prop, env);
    }

    throw new Error(`RuntimeError: Type ${typeof obj} has no property '${node.prop}'`);
  }

  evalArrayMethod(arr, prop, env) {
    switch (prop) {
      case 'map':
        return fn => arr.map(x => {
          if (fn instanceof KaiFunction) {
            return fn.call(this, [x]);
          }
          return fn(x);
        });
      case 'filter':
        return fn => arr.filter(x => {
          if (fn instanceof KaiFunction) {
            return fn.call(this, [x]);
          }
          return fn(x);
        });
      case 'reduce':
        return (fn, init) => arr.reduce((acc, x) => {
          if (fn instanceof KaiFunction) {
            return fn.call(this, [acc, x]);
          }
          return fn(acc, x);
        }, init);
      case 'push':
        return val => {
          arr.push(val);
          return arr;
        };
      case 'sum':
        return arr.reduce((a, b) => a + b, 0);
      case 'mean':
        return arr.reduce((a, b) => a + b, 0) / arr.length;
      case 'min':
        return Math.min(...arr);
      case 'max':
        return Math.max(...arr);
      case 'length':
        return arr.length;
      default:
        throw new Error(`RuntimeError: Array has no method '${prop}'`);
    }
  }

  evalStringMethod(str, prop, env) {
    switch (prop) {
      case 'trim':
        return () => str.trim();
      case 'upper':
        return () => str.toUpperCase();
      case 'lower':
        return () => str.toLowerCase();
      case 'split':
        return sep => str.split(sep);
      case 'includes':
        return substr => str.includes(substr);
      case 'length':
        return str.length;
      default:
        throw new Error(`RuntimeError: String has no method '${prop}'`);
    }
  }

  evalBlockExpr(node, env) {
    const blockEnv = env.child();
    let result = null;

    for (const stmt of node.stmts) {
      result = this.eval(stmt, blockEnv);
    }

    return result;
  }

  evalPipeExpr(node, env) {
    const left = this.eval(node.left, env);
    const right = this.eval(node.right, env);

    // Right side should be callable
    if (right instanceof KaiFunction) {
      return right.call(this, [left]);
    }

    if (typeof right === 'function') {
      return right(left);
    }

    throw new Error(`RuntimeError: Pipeline operator requires right side to be callable`);
  }

  /**
   * Define standard library functions
   */
  defineStdlib() {
    const env = new Environment();

    // Math functions
    const mathFns = {
      abs: Math.abs,
      sqrt: Math.sqrt,
      floor: Math.floor,
      ceil: Math.ceil,
      round: Math.round,
      pow: Math.pow,
      log: Math.log,
      exp: Math.exp,
      min: Math.min,
      max: Math.max,
      PI: Math.PI,
      E: Math.E,
      rand: () => Math.random(),
      randInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    };

    // Array functions
    const arrayFns = {
      len: arr => arr.length,
      range: (start, end) => Array.from({ length: end - start }, (_, i) => start + i),
      sum: arr => arr.reduce((a, b) => a + b, 0),
      mean: arr => arr.reduce((a, b) => a + b, 0) / arr.length,
      map: (arr, fn) => arr.map(fn),
      filter: (arr, fn) => arr.filter(fn),
      reduce: (arr, fn, init) => arr.reduce(fn, init),
      zip: (a, b) => a.map((x, i) => [x, b[i]]),
      flatten: arr => arr.flat(),
      sort: arr => [...arr].sort((a, b) => a - b),
      reverse: arr => [...arr].reverse(),
      head: arr => arr[0],
      tail: arr => arr.slice(1),
      unique: arr => [...new Set(arr)],
      includes: (arr, x) => arr.includes(x),
    };

    // Stats functions (ML-focused)
    const statsFns = {
      std: arr => {
        const m = arr.reduce((a, b) => a + b, 0) / arr.length;
        return Math.sqrt(arr.reduce((sum, x) => sum + Math.pow(x - m, 2), 0) / arr.length);
      },
      variance: arr => {
        const m = arr.reduce((a, b) => a + b, 0) / arr.length;
        return arr.reduce((sum, x) => sum + Math.pow(x - m, 2), 0) / arr.length;
      },
      normalize: arr => {
        const m = arr.reduce((a, b) => a + b, 0) / arr.length;
        const s = Math.sqrt(arr.reduce((sum, x) => sum + Math.pow(x - m, 2), 0) / arr.length);
        return arr.map(x => (x - m) / s);
      },
      dot: (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0),
    };

    // I/O functions
    const ioFns = {
      print: (...args) => {
        console.log(...args);
        return args[args.length - 1]; // Return last argument
      },
    };

    // Define all functions
    Object.entries(mathFns).forEach(([name, fn]) => env.define(name, fn));
    Object.entries(arrayFns).forEach(([name, fn]) => env.define(name, fn));
    Object.entries(statsFns).forEach(([name, fn]) => env.define(name, fn));
    Object.entries(ioFns).forEach(([name, fn]) => env.define(name, fn));

    return env;
  }
}

module.exports = { Interpreter, Environment, KaiFunction, ReturnSignal };
