# Architecture

Learn about Kai's internal architecture and implementation.

## Overview

Kai is implemented in three main phases:

1. **Lexer** - Tokenizes source code
2. **Parser** - Builds Abstract Syntax Tree (AST)
3. **Interpreter** - Executes the AST

## Architecture Diagram

```
Source Code (.kai)
       ↓
    [Lexer]
       ↓
   Tokens
       ↓
   [Parser]
       ↓
    AST
       ↓
[Interpreter]
       ↓
    Output
```

## Current Implementation: Tree-Walker

Kai v0.4.0 uses a **tree-walking interpreter**:

```
src/
├── lexer.js          # Tokenization (lexical analysis)
├── parser.js         # AST generation (syntax analysis)
├── interpreter.js    # AST execution (semantic analysis)
├── ast.js           # AST node definitions
└── typechecker.js   # Type checking and inference
```

### Lexer (lexer.js)

**Purpose**: Convert source code into tokens

**Input**: Raw source code string
**Output**: Array of tokens

Example:
```javascript
// Input: "x := 42"
// Output: [
//   { type: 'IDENTIFIER', value: 'x' },
//   { type: 'WALRUS', value: ':=' },
//   { type: 'NUMBER', value: 42 }
// ]
```

**Key Functions**:
- `tokenize(code)` - Main entry point
- `readNumber()` - Parse numeric literals
- `readString()` - Parse string literals
- `readIdentifier()` - Parse identifiers and keywords

### Parser (parser.js)

**Purpose**: Build Abstract Syntax Tree from tokens

**Input**: Array of tokens
**Output**: AST (nested objects)

Example:
```javascript
// Input: [{ type: 'IDENTIFIER', value: 'x' }, ...]
// Output: {
//   type: 'VarDecl',
//   name: 'x',
//   value: { type: 'Number', value: 42 }
// }
```

**Key Functions**:
- `parse(tokens)` - Main entry point
- `parseStatement()` - Parse statements
- `parseExpression()` - Parse expressions
- `parseBinaryExpression()` - Parse operators with precedence

### AST (ast.js)

**Purpose**: Define AST node types

**Node Types**:
- `Number` - Numeric literals
- `String` - String literals
- `Boolean` - Boolean literals
- `Null` - Null value
- `Identifier` - Variable references
- `VarDecl` - Variable declarations (`:=`)
- `Assignment` - Variable assignments (`=`)
- `BinaryOp` - Binary operations (`+`, `-`, `*`, `/`)
- `Comparison` - Comparisons (`==`, `!=`, `<`, `>`)
- `Logical` - Logical operations (`&&`, `||`, `!`)
- `If` - If statements
- `While` - While loops
- `For` - For loops
- `Function` - Function definitions
- `Call` - Function calls
- `Array` - Array literals
- `ArrayMethod` - Array methods (`.map()`, `.filter()`)
- `Pipeline` - Pipeline operations (`|>`)

### Interpreter (interpreter.js)

**Purpose**: Execute the AST

**Input**: AST
**Output**: Result values

**Environment**:
- Global environment with built-in functions
- Lexical scoping for closures
- Variable storage and lookup

**Key Functions**:
- `interpret(ast, env)` - Main entry point
- `evaluate(node, env)` - Recursive evaluation
- `applyFunction(func, args)` - Function calls
- `createBuiltIns()` - Built-in functions

### Type Checker (typechecker.js)

**Purpose**: Type checking and inference

**Features**:
- Gradual typing (optional types)
- Type inference from values
- Function type checking
- Generic type support (planned)

**Mode**: Warn mode - prints type errors in yellow, continues execution

## Performance Roadmap

### Phase 1: Tree-Walker (Current) ✅
- **Status**: Complete (v0.4.0)
- **Performance**: Baseline (1x)
- **Pros**: Simple, correct, easy to debug
- **Cons**: Slow, re-parses AST

### Phase 2: Bytecode VM (v0.5.0)
- **Status**: In progress
- **Performance**: 10-50x faster
- **Implementation**:
  - Bytecode compiler (AST → bytecode)
  - Virtual machine (execute bytecode)
  - Stack-based operations
- **Example**:
  ```kai
  x := 42
  # Becomes:
  LOAD_CONST 42
  STORE_VAR 'x'
  ```

### Phase 3: Tracing JIT (v0.7.0)
- **Status**: Planned
- **Performance**: 100-1000x faster for hot code
- **Implementation**:
  - Record hot loops
  - Compile to native code
  - Type specialization
  - Based on LuaJIT model

### Phase 4: WASM Target (v0.8.0)
- **Status**: Planned
- **Performance**: Native web speed
- **Use Cases**:
  - Browser-based ML
  - Interactive tutorials
  - In-browser REPL

### Phase 5: Native Compilation (v1.0.0)
- **Status**: Planned
- **Performance**: Maximum performance
- **Implementation**:
  - LLVM backend or custom codegen
  - Ahead-of-time (AOT) compilation
  - Standalone binaries

## Memory Management

### Current (v0.4.0)
- JavaScript garbage collection
- No manual memory management
- Simple reference counting

### Future (v1.0.0)
- Optional manual memory management
- RAII patterns
- Memory pools for ML workloads

## Interoperability

### Python Bridge (v0.6.0)
- Call Python functions from Kai
- NumPy integration
- PyTorch/TensorFlow support

**Example**:
```kai
import numpy as np

arr := np.array([1, 2, 3])
result := np.sum(arr)
```

### C FFI (v0.9.0)
- Call C functions from Kai
- BLAS/LAPACK integration
- CUDA support

**Example**:
```kai
extern c blas_dgemm

result := blas_dgemm(/* ... */)
```

## Type System

### Gradual Typing
- Types are optional
- Type inference for untyped code
- Type errors are warnings (not errors)

### Type Inference
```kai
# Int inference
x := 42        # x: int

# Float inference
y := 3.14      # y: float

# Float from int + float
z := x + y     # z: float (3.14 is float)
```

### Function Types
```kai
# Untyped function
add := (a, b) => a + b

# Typed function
add: (int, int) => int := (a, b) => a + b

# Generic function
identity: (T) => T := (x) => x
```

## Standard Library

### Math Functions
- `abs`, `sqrt`, `pow`, `log`, `exp`
- `floor`, `ceil`, `round`
- `min`, `max`
- `rand`, `randInt`
- `PI`, `E`

### Array Functions
- `map`, `filter`, `reduce`
- `sum`, `mean`, `min`, `max`
- `sort`, `reverse`
- `head`, `tail`
- `zip`, `flatten`

### Statistics (ML)
- `std`, `variance`
- `normalize`
- `dot`

## File Structure

```
kai/
├── src/
│   ├── lexer.js         # Lexical analysis
│   ├── parser.js        # Syntax analysis
│   ├── interpreter.js   # Semantic analysis
│   ├── ast.js          # AST definitions
│   └── typechecker.js  # Type system
├── tests/
│   ├── basic.kai       # Basic features
│   ├── typed.kai       # Type system
│   ├── type_errors.kai # Type errors
│   ├── controlflow.kai # Control flow
│   └── records.kai     # Records
├── docs/               # Documentation
├── kai.js             # CLI entry point
└── package.json       # Project config
```

## Contributing to Architecture

See [Contributing Guide](/internals/contributing) for:
- Code style guidelines
- Testing practices
- Pull request process

## Further Reading

- [Roadmap](/internals/roadmap) - Future plans
- [Language Design](/guide/introduction) - Design philosophy
- [Type System](/guide/advanced/type-system) - Type system details

---

**Questions?** Open an issue on GitHub or start a Discussion.
