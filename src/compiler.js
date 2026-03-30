/**
 * Kai Bytecode Compiler
 *
 * Compiles AST to bytecode for the VM
 */

const { Opcode } = require('./bytecode');
const { Chunk } = require('./bytecode');

class Compiler {
  constructor() {
    this.chunk = null;
    this.regCount = 0; // Number of registers used
  }

  /**
   * Compile an AST node to bytecode
   */
  compile(ast) {
    this.chunk = new Chunk('main');
    this.regCount = 0;

    this.compileNode(ast);

    // Add implicit return of r0
    this.chunk.emit(Opcode.RETURN, 0);

    return this.chunk;
  }

  /**
   * Compile any AST node
   */
  compileNode(node) {
    switch (node.type) {
      case 'Program':
        return this.compileProgram(node);

      case 'NumberLiteral':
        return this.compileNumberLiteral(node);

      case 'StringLiteral':
        return this.compileStringLiteral(node);

      case 'BoolLiteral':
        return this.compileBoolLiteral(node);

      case 'NullLiteral':
        return this.compileNullLiteral(node);

      case 'Identifier':
        return this.compileIdentifier(node);

      case 'BinaryExpr':
        return this.compileBinaryExpr(node);

      case 'UnaryExpr':
        return this.compileUnaryExpr(node);

      case 'AssignStmt':
        return this.compileAssignStmt(node);

      case 'BlockExpr':
        return this.compileBlockExpr(node);

      case 'IfExpr':
        return this.compileIfExpr(node);

      default:
        throw new Error(`Compiler error: Unhandled node type '${node.type}'`);
    }
  }

  /**
   * Allocate a register
   */
  allocReg() {
    return this.regCount++;
  }

  /**
   * Free registers (simple version - just reset count)
   */
  freeRegs(count) {
    this.regCount -= count;
  }

  /**
   * Compile a program (list of statements)
   */
  compileProgram(node) {
    let lastReg = -1;

    for (const stmt of node.body) {
      lastReg = this.compileNode(stmt);
      // Free registers after each statement
      this.regCount = 0;
    }

    return lastReg;
  }

  /**
   * Compile a number literal
   */
  compileNumberLiteral(node) {
    const reg = this.allocReg();
    const constIdx = this.chunk.addConstant(node.value);
    this.chunk.emit(Opcode.LOAD_CONST, reg, constIdx);
    return reg;
  }

  /**
   * Compile a string literal
   */
  compileStringLiteral(node) {
    const reg = this.allocReg();
    const constIdx = this.chunk.addConstant(node.value);
    this.chunk.emit(Opcode.LOAD_CONST, reg, constIdx);
    return reg;
  }

  /**
   * Compile a boolean literal
   */
  compileBoolLiteral(node) {
    const reg = this.allocReg();
    const constIdx = this.chunk.addConstant(node.value);
    this.chunk.emit(Opcode.LOAD_CONST, reg, constIdx);
    return reg;
  }

  /**
   * Compile a null literal
   */
  compileNullLiteral(node) {
    const reg = this.allocReg();
    const constIdx = this.chunk.addConstant(null);
    this.chunk.emit(Opcode.LOAD_CONST, reg, constIdx);
    return reg;
  }

  /**
   * Compile an identifier (variable reference)
   */
  compileIdentifier(node) {
    const reg = this.allocReg();
    const varIdx = this.chunk.addVariable(node.name);
    this.chunk.emit(Opcode.LOAD_VAR, reg, varIdx);
    return reg;
  }

  /**
   * Compile a binary expression
   */
  compileBinaryExpr(node) {
    // Compile left and right operands
    const leftReg = this.compileNode(node.left);
    const rightReg = this.compileNode(node.right);

    // Allocate result register
    const resultReg = this.allocReg();

    // Emit operation
    const opcode = this.getBinaryOpcode(node.op);
    this.chunk.emit(opcode, resultReg, leftReg, rightReg);

    return resultReg;
  }

  /**
   * Compile a unary expression
   */
  compileUnaryExpr(node) {
    const operandReg = this.compileNode(node.operand);
    const resultReg = this.allocReg();

    if (node.op === '!') {
      this.chunk.emit(Opcode.NOT, resultReg, operandReg);
    } else if (node.op === '-') {
      this.chunk.emit(Opcode.NEG, resultReg, operandReg);
    } else {
      throw new Error(`Compiler error: Unknown unary operator '${node.op}'`);
    }

    return resultReg;
  }

  /**
   * Compile an assignment statement
   */
  compileAssignStmt(node) {
    // Compile the value expression
    const valueReg = this.compileNode(node.value);

    // Store it in the variable
    const varIdx = this.chunk.addVariable(node.name);
    this.chunk.emit(Opcode.STORE_VAR, varIdx, valueReg);

    return valueReg;
  }

  /**
   * Compile a block expression
   */
  compileBlockExpr(node) {
    let lastReg = -1;

    for (const stmt of node.stmts) {
      lastReg = this.compileNode(stmt);
    }

    return lastReg;
  }

  /**
   * Compile an if expression
   */
  compileIfExpr(node) {
    // Compile condition
    const condReg = this.compileNode(node.cond);

    // Emit jump if false
    const jumpToElseInst = this.chunk.emit(Opcode.JUMP_IF_FALSE, condReg, 0); // Placeholder offset

    // Compile then branch
    this.compileNode(node.then);

    // Jump over else branch
    const jumpToEndInst = this.chunk.emit(Opcode.JUMP, 0); // Placeholder offset

    // Patch jump to else
    const elseOffset = this.chunk.instructions.length - jumpToElseInst - 1;
    this.chunk.patchJump(jumpToElseInst, elseOffset);

    // Compile else branch (if present)
    if (node.else_) {
      this.compileNode(node.else_);
    }

    // Patch jump to end
    const endOffset = this.chunk.instructions.length - jumpToEndInst - 1;
    this.chunk.patchJump(jumpToEndInst, endOffset);

    return -1; // If expressions don't leave a value in registers (simplified)
  }

  /**
   * Get opcode for binary operator
   */
  getBinaryOpcode(op) {
    switch (op) {
      case '+': return Opcode.ADD;
      case '-': return Opcode.SUB;
      case '*': return Opcode.MUL;
      case '/': return Opcode.DIV;
      case '%': return Opcode.MOD;
      case '==': return Opcode.EQ;
      case '!=': return Opcode.NEQ;
      case '<': return Opcode.LT;
      case '<=': return Opcode.LTE;
      case '>': return Opcode.GT;
      case '>=': return Opcode.GTE;
      case '&&': return Opcode.AND;
      case '||': return Opcode.OR;
      default: throw new Error(`Compiler error: Unknown binary operator '${op}'`);
    }
  }
}

module.exports = { Compiler };
