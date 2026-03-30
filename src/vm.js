/**
 * Kai Virtual Machine
 *
 * Register-based VM for executing Kai bytecode
 * Uses 32 virtual registers (r0-r31)
 */

const { Opcode, OpcodeNames, Chunk } = require('./bytecode');

// Number of virtual registers
const NUM_REGISTERS = 32;

class VM {
  constructor() {
    this.reset();
  }

  /**
   * Reset VM state
   */
  reset() {
    // Register file
    this.registers = new Array(NUM_REGISTERS).fill(null);

    // Call stack
    this.callStack = [];

    // Current instruction pointer
    this.ip = 0;

    // Current chunk
    this.chunk = null;

    // Global environment (for variables)
    this.globals = new Map();
  }

  /**
   * Interpret a chunk of bytecode
   */
  interpret(chunk) {
    this.chunk = chunk;
    this.ip = 0;
    this.registers.fill(null);

    try {
      return this.run();
    } catch (e) {
      this.runtimeError(e);
      throw e;
    }
  }

  /**
   * Main execution loop
   */
  run() {
    while (this.ip < this.chunk.instructions.length) {
      const inst = this.chunk.instructions[this.ip];

      // Debug: print instruction
      // console.log(`[${this.ip}] ${inst.toString()}`);

      this.ip++; // Advance to next instruction

      this.executeInstruction(inst);
    }

    // Return value from r0 (convention: function result in r0)
    return this.registers[0];
  }

  /**
   * Execute a single instruction
   */
  executeInstruction(inst) {
    switch (inst.opcode) {
      // Load/Store
      case Opcode.LOAD_CONST:
        this.binopLoadConst(inst.operands[0], inst.operands[1]);
        break;

      case Opcode.LOAD_VAR:
        this.binopLoadVar(inst.operands[0], inst.operands[1]);
        break;

      case Opcode.STORE_VAR:
        this.binopStoreVar(inst.operands[0], inst.operands[1]);
        break;

      // Arithmetic
      case Opcode.ADD:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a + b);
        break;

      case Opcode.SUB:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a - b);
        break;

      case Opcode.MUL:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a * b);
        break;

      case Opcode.DIV:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a / b);
        break;

      case Opcode.MOD:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a % b);
        break;

      case Opcode.NEG:
        this.unaryArith(inst.operands[0], inst.operands[1], a => -a);
        break;

      // Comparison
      case Opcode.EQ:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a === b);
        break;

      case Opcode.NEQ:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a !== b);
        break;

      case Opcode.LT:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a < b);
        break;

      case Opcode.LTE:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a <= b);
        break;

      case Opcode.GT:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a > b);
        break;

      case Opcode.GTE:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a >= b);
        break;

      // Logical
      case Opcode.AND:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a && b);
        break;

      case Opcode.OR:
        this.binopArith(inst.operands[0], inst.operands[1], inst.operands[2], (a, b) => a || b);
        break;

      case Opcode.NOT:
        this.unaryArith(inst.operands[0], inst.operands[1], a => !a);
        break;

      // Control flow
      case Opcode.JUMP:
        this.ip += inst.operands[0];
        break;

      case Opcode.JUMP_IF_FALSE:
        if (!this.registers[inst.operands[0]]) {
          this.ip += inst.operands[1];
        }
        break;

      case Opcode.JUMP_IF_TRUE:
        if (this.registers[inst.operands[0]]) {
          this.ip += inst.operands[1];
        }
        break;

      // Function operations
      case Opcode.RETURN:
        // For now, just halt execution and return the value
        return this.registers[inst.operands[0]];

      // Arrays
      case Opcode.NEW_ARRAY:
        this.registers[inst.operands[0]] = new Array(inst.operands[1]).fill(null);
        break;

      // NOP
      case Opcode.NOP:
        break;

      default:
        throw new Error(`Unknown opcode: ${OpcodeNames[inst.opcode]} (${inst.opcode})`);
    }
  }

  /**
   * LOAD_CONST reg, const_idx
   */
  binopLoadConst(reg, constIdx) {
    const value = this.chunk.constants[constIdx];
    this.registers[reg] = value;
  }

  /**
   * LOAD_VAR reg, var_name_idx
   */
  binopLoadVar(reg, varNameIdx) {
    const varName = this.chunk.variables[varNameIdx];
    const value = this.globals.get(varName);
    if (value === undefined) {
      throw new Error(`RuntimeError: Undefined variable '${varName}'`);
    }
    this.registers[reg] = value;
  }

  /**
   * STORE_VAR var_name_idx, reg
   */
  binopStoreVar(varNameIdx, reg) {
    const varName = this.chunk.variables[varNameIdx];
    const value = this.registers[reg];
    this.globals.set(varName, value);
  }

  /**
   * Binary arithmetic operation
   */
  binopArith(dest, src1, src2, op) {
    const left = this.registers[src1];
    const right = this.registers[src2];
    this.registers[dest] = op(left, right);
  }

  /**
   * Unary arithmetic operation
   */
  unaryArith(dest, src, op) {
    const value = this.registers[src];
    this.registers[dest] = op(value);
  }

  /**
   * Print runtime error with context
   */
  runtimeError(error) {
    console.error(`RuntimeError: ${error.message}`);
    if (this.chunk && this.ip > 0) {
      console.error(`  at instruction ${this.ip - 1}`);
    }
  }

  /**
   * Get current state (for debugging)
   */
  getState() {
    return {
      ip: this.ip,
      registers: Array.from(this.registers),
      globals: Array.from(this.globals.entries()),
    };
  }
}

module.exports = { VM, NUM_REGISTERS };
