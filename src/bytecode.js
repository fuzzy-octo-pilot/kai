/**
 * Kai Bytecode Instruction Set
 *
 * Register-based bytecode for the Kai Virtual Machine
 * Uses 32 virtual registers (r0-r31)
 */

// Opcode constants
const Opcode = {
  // Load/Store operations
  LOAD_CONST: 0,      // LOAD_CONST reg, value_idx
  LOAD_VAR: 1,        // LOAD_VAR reg, var_name_idx
  STORE_VAR: 2,       // STORE_VAR var_name_idx, reg

  // Arithmetic operations
  ADD: 10,            // ADD dest, src1, src2
  SUB: 11,            // SUB dest, src1, src2
  MUL: 12,            // MUL dest, src1, src2
  DIV: 13,            // DIV dest, src1, src2
  MOD: 14,            // MOD dest, src1, src2
  NEG: 15,            // NEG dest, src (unary negation)

  // Comparison operations
  EQ: 20,             // EQ dest, src1, src2
  NEQ: 21,            // NEQ dest, src1, src2
  LT: 22,             // LT dest, src1, src2
  LTE: 23,            // LTE dest, src1, src2
  GT: 24,             // GT dest, src1, src2
  GTE: 25,            // GTE dest, src1, src2

  // Logical operations
  AND: 30,            // AND dest, src1, src2
  OR: 31,             // OR dest, src1, src2
  NOT: 32,            // NOT dest, src

  // Control flow
  JUMP: 40,           // JUMP offset
  JUMP_IF_FALSE: 41,  // JUMP_IF_FALSE reg, offset
  JUMP_IF_TRUE: 42,   // JUMP_IF_TRUE reg, offset

  // Function operations
  CALL: 50,           // CALL dest_reg, argc, reg...
  RETURN: 51,         // RETURN reg

  // Array/Record operations
  NEW_ARRAY: 60,      // NEW_ARRAY dest_reg, size
  GET_MEMBER: 61,     // GET_MEMBER obj_reg, prop_idx, dest_reg
  SET_MEMBER: 62,     // SET_MEMBER obj_reg, prop_idx, src_reg

  // Special
  NOP: 99,            // No operation
};

// Opcode names for debugging
const OpcodeNames = {
  [Opcode.LOAD_CONST]: 'LOAD_CONST',
  [Opcode.LOAD_VAR]: 'LOAD_VAR',
  [Opcode.STORE_VAR]: 'STORE_VAR',
  [Opcode.ADD]: 'ADD',
  [Opcode.SUB]: 'SUB',
  [Opcode.MUL]: 'MUL',
  [Opcode.DIV]: 'DIV',
  [Opcode.MOD]: 'MOD',
  [Opcode.NEG]: 'NEG',
  [Opcode.EQ]: 'EQ',
  [Opcode.NEQ]: 'NEQ',
  [Opcode.LT]: 'LT',
  [Opcode.LTE]: 'LTE',
  [Opcode.GT]: 'GT',
  [Opcode.GTE]: 'GTE',
  [Opcode.AND]: 'AND',
  [Opcode.OR]: 'OR',
  [Opcode.NOT]: 'NOT',
  [Opcode.JUMP]: 'JUMP',
  [Opcode.JUMP_IF_FALSE]: 'JUMP_IF_FALSE',
  [Opcode.JUMP_IF_TRUE]: 'JUMP_IF_TRUE',
  [Opcode.CALL]: 'CALL',
  [Opcode.RETURN]: 'RETURN',
  [Opcode.NEW_ARRAY]: 'NEW_ARRAY',
  [Opcode.GET_MEMBER]: 'GET_MEMBER',
  [Opcode.SET_MEMBER]: 'SET_MEMBER',
  [Opcode.NOP]: 'NOP',
};

/**
 * Instruction class - represents a single bytecode instruction
 */
class Instruction {
  constructor(opcode, operands = []) {
    this.opcode = opcode;
    this.operands = operands;
  }

  toString() {
    const name = OpcodeNames[this.opcode] || `UNKNOWN(${this.opcode})`;
    return `${name} ${this.operands.join(', ')}`;
  }

  toJSON() {
    return {
      opcode: this.opcode,
      operands: this.operands,
    };
  }
}

/**
 * Chunk - a sequence of bytecode instructions with constants
 */
class Chunk {
  constructor(name = 'main') {
    this.name = name;
    this.instructions = [];
    this.constants = [];
    this.variables = []; // Variable names for LOAD_VAR/STORE_VAR
  }

  /**
   * Add an instruction to the chunk
   */
  emit(opcode, ...operands) {
    const inst = new Instruction(opcode, operands);
    this.instructions.push(inst);
    return this.instructions.length - 1; // Return instruction index
  }

  /**
   * Add a constant value to the chunk
   * Returns the index of the constant
   */
  addConstant(value) {
    this.constants.push(value);
    return this.constants.length - 1;
  }

  /**
   * Add a variable name to the chunk
   * Returns the index of the variable name
   */
  addVariable(name) {
    const idx = this.variables.indexOf(name);
    if (idx !== -1) return idx;
    this.variables.push(name);
    return this.variables.length - 1;
  }

  /**
   * Patch a jump instruction with its target offset
   */
  patchJump(instIdx, offset) {
    const inst = this.instructions[instIdx];
    if (!inst) {
      throw new Error(`Cannot patch non-existent instruction at index ${instIdx}`);
    }
    inst.operands[0] = offset;
  }

  /**
   * Disassemble the chunk to a string
   */
  disassemble() {
    let lines = [];
    lines.push(`=== Chunk: ${this.name} ===`);
    lines.push(`Constants: ${this.constants.length}`);
    this.constants.forEach((c, i) => {
      lines.push(`  [${i}] ${JSON.stringify(c)}`);
    });
    lines.push(`Variables: ${this.variables.length}`);
    this.variables.forEach((v, i) => {
      lines.push(`  [${i}] "${v}"`);
    });
    lines.push(`Instructions: ${this.instructions.length}`);
    this.instructions.forEach((inst, i) => {
      lines.push(`  [${i}] ${inst.toString()}`);
    });
    return lines.join('\n');
  }
}

module.exports = {
  Opcode,
  OpcodeNames,
  Instruction,
  Chunk,
};
