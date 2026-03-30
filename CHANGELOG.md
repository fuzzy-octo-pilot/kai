# Changelog

All notable changes to Kai will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-03-30

### Added
- **Records (Structs/Objects)**
  - Record literal syntax: `{ key: value, key2: value2 }`
  - Nested records support
  - Dot notation for property access: `record.property`
  - Perfect for ML model configurations
  - Records implemented as plain JavaScript objects

- **Mutation Operator (=)**
  - Variable reassignment: `x = x + 1`
  - Record field mutation: `obj.prop = value`
  - Chained member mutation: `obj.prop.nested = value`
  - Distinct from assignment (`:=` creates new bindings, `=` mutates existing)
  - Essential for training loops and state updates

- **While Loops**
  - Conditional iteration: `while condition { body }`
  - Supports boolean and numeric conditions
  - Lexical scoping for loop body

- **Loop Control: Break & Continue**
  - `break` statement to exit while loops early
  - `continue` statement to skip to next iteration
  - Exception-based flow control for clean implementation

- **AST Nodes**
  - `RecordLiteral` - for record literals
  - `AssignExpr` - for mutation (= operator)
  - `WhileLoop` - for while loops
  - `BreakStmt` - for break statements
  - `ContinueStmt` - for continue statements

- **Parser Improvements**
  - Record literal parsing with lookahead to distinguish from blocks
  - Flexible mutation detection for simple and chained member access
  - While loop parsing with condition and body

- **Interpreter Enhancements**
  - Record evaluation creates plain JavaScript objects
  - Mutation uses `env.set()` for variables, direct property assignment for records
  - While loop evaluation with break/continue handling via try/catch

- **Type Checker Updates**
  - Record literal type checking (currently T_ANY, structural typing planned)
  - Mutation type checking with type compatibility verification
  - While loop condition type checking
  - Break/continue statement type checking (T_VOID)

- **Test Suite**
  - New `tests/records.kai` with 112 lines of comprehensive tests
  - Tests record literals, nested records, mutation, while loops, break/continue
  - All edge cases covered

### Changed
- Enhanced `evalMemberExpr` to handle record property access
- Updated parser statement detection for mutation patterns
- Lexer now recognizes `=` as MUTATE token (not an error)

### Fixed
- Fixed parser to handle chained member access mutation (`obj.prop.nested = value`)
- Fixed record property access to return correct values
- Fixed while loop break/continue signal handling
- Fixed numeric array operations to validate element types
  - `mean()`, `sum()`, `std()`, `variance()`, `min()`, `max()`, `normalize()`, `dot()` now require all array elements to be numeric
  - Previously, arrays with mixed types (e.g., `[1, "2", 3]`) would cause string concatenation bugs
  - Now throws descriptive error: `mean() requires all array elements to be numeric. Element at index 1 is string: "2"`

## [0.3.0] - 2026-03-30

### Added
- **Control Flow: If/Else Statements**
  - Full if/else statement support with optional else clause
  - Nested if/else statements
  - Truthy value handling (non-null, non-zero, non-false)
  - Syntax: `if condition { ... } else { ... }`

- **Control Flow: For Loops**
  - Iterator-based for loops over arrays
  - Works with `range()` function for numeric iteration
  - Supports nested loops
  - Lexical scoping for loop variables
  - Syntax: `for var in iterable { ... }`

- **Array Method: .push()**
  - Added `.push()` method for mutating arrays
  - Returns the array for chaining

- **Test Suite**
  - New `tests/controlflow.kai` with 116 lines of control flow tests
  - Tests for if/else, for loops, nested structures, and combined patterns

### Changed
- Improved parser statement detection to handle `if` and `for` keywords
- Enhanced interpreter with control flow evaluation
- Added `ForLoop` AST node to represent for loop constructs

### Fixed
- Fixed empty parameter list parsing in arrow functions: `() => ...`
- Fixed block parsing to properly consume opening `{`
- Fixed single-parameter arrow function parsing: `x => ...`
- Fixed member expression property validation

## [0.2.0] - 2026-03-30

### Added
- **Type System**
  - Complete gradual type system implementation
  - Type annotations on variables: `x: int := 42`
  - Type annotations on functions: `(n: float): float => n * 2`
  - Type inference for untyped code
  - Array types: `int[]`, `float[]`
  - Tensor types: `Tensor[float32, (128, 64)]`
  - Function types: `(int, float) -> float`

- **Type Checker**
  - Warn mode by default (errors printed but execution continues)
  - Line and column numbers in error messages
  - Type compatibility checking with widening (int → float)
  - Function arity checking
  - Return type validation

- **Test Suites**
  - `tests/typed.kai` - Type annotations and inference (96 lines)
  - `tests/type_errors.kai` - Type error detection (47 lines, 7 expected errors)

### Changed
- Integrated type checker into main execution pipeline
- Type errors displayed in yellow as warnings
- Gradual typing - execution continues despite type errors

### Fixed
- Fixed type checker to handle untyped code gracefully
- Array method return types properly inferred
- Function parameter/return type annotations parsed correctly

## [0.1.0] - 2026-03-30

### Added
- **Core Language Features**
  - Variables: `x := 42` (Go-style walrus operator)
  - Functions: `add := (a, b) => a + b`
  - Single-param shorthand: `double := x => x * 2`
  - Multi-line functions with `return`
  - Closures and higher-order functions
  - Comments: `#` (Python-style)

- **Data Types**
  - Primitive types: int, float, bool, str, null
  - Arrays: `[1, 2, 3]`, `[1.0, 2.5, 3.0]`
  - Automatic int vs float distinction: `1` vs `1.0`

- **Operators**
  - Arithmetic: `+`, `-`, `*`, `/`, `%`
  - Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
  - Logical: `&&`, `||`, `!`
  - Pipeline operator: `|>`

- **Standard Library**
  - Math: `abs`, `sqrt`, `floor`, `ceil`, `round`, `pow`, `log`, `exp`, `min`, `max`, `PI`, `E`, `rand`, `randInt`
  - Arrays: `len`, `range`, `map`, `filter`, `reduce`, `sum`, `mean`, `sort`, `reverse`, `head`, `tail`, `unique`, `includes`
  - Stats (ML-focused): `std`, `variance`, `normalize`, `dot`
  - String methods: `.trim()`, `.upper()`, `.lower()`, `.split()`, `.includes()`, `.length`

- **Execution**
  - Tree-walking interpreter
  - REPL with commands: `:help`, `:env`, `:clear`, `:q`
  - File runner: `node kai.js file.kai`

- **Test Suite**
  - `tests/basic.kai` - Core language features (140 lines)

### Architecture
- Lexer (tokenizer) → Token stream
- Parser (recursive descent) → AST
- Interpreter (tree-walking) → Execution
- Project structure:
  - `kai.js` - Entry point
  - `src/lexer.js` - Tokenizer
  - `src/ast.js` - AST node definitions
  - `src/parser.js` - Parser
  - `src/interpreter.js` - Interpreter
  - `src/typechecker.js` - Type checker
  - `tests/` - Test files

### Design Decisions
- Go-style `:=` for assignment (no `let`, `const`, `var`)
- Arrow functions only (no `function` keyword)
- Python-style `#` comments
- `.kai` file extension
- Gradual typing - types are optional but enable optimizations
