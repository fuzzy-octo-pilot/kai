# Kai Language

## What is Kai?

**Kai** (海, "ocean" in Japanese) is a new programming language being designed for ML/AI development.
It is being built incrementally, step by step, with evaluation at each stage.

---

## Design Decisions Made (Non-negotiable)

### Syntax

- Variable declaration: `x := 42` (Go-style walrus, no `let`/`const`/`var`)
- Type-annotated variables: `x: int := 42`, `scores: float[] := [1.0, 2.0]`
- Functions: `add := (a, b) => a + b` (arrow-only, no `function` keyword)
- Typed functions: `square := (n: float): float => n * n`
- Single-param shorthand: `double := x => x * 2`
- Comments: `#` (Python-style, not `//`)
- File extension: `.kai`

### Language Character

- **Distinct from JS** — not JS with extras. Takes the _best parts_ of JS (arrow functions,
  destructuring feel, `|>` pipeline) but feels like its own language.
- **Inspired by**: Go (`:=`), JavaScript (arrows, closures), Julia (numeric types), Python (clean syntax)
- **NOT** keyword-heavy. Minimize reserved words.

### Performance Strategy

- **JIT compilation** (tracing JIT, LuaJIT model) — record hot loops, compile to native
- **Dual compile targets**: Native binary + WebAssembly
- **Gradual static typing** — types are optional but unlock JIT specialization
- **Interop-first**: Python bridge (call NumPy/PyTorch), C FFI (call BLAS, CUDA libs)
- Build order: Tree-walker interpreter → Bytecode VM → JIT → WASM/Native targets

### ML/AI Focus

- Native tensors: `Tensor[float32, (128, 64)]` — shape is part of the type
- Pipeline operator `|>` is first-class: `data |> normalize |> model.predict`
- Stats stdlib built in: `mean`, `std`, `normalize`, `dot`, etc.
- End goal: Be the best language for AI/ML pipelines

---

## Current State: v0.2 (Phase 1 Complete)

### What works RIGHT NOW

**All three test suites pass:**

```
node kai.js tests/basic.kai     ✓
node kai.js tests/typed.kai     ✓
node kai.js tests/type_errors.kai  ✓ (shows 2 type errors, catches them correctly)
```

**Working features:**

- Variables (typed and untyped): `x := 42`, `x: float := 3.14`
- All primitive types: int, float, bool, str, null
- Array literals: `[1, 2, 3]`, `[1.0, 2.5, 3.0]`
- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparisons: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`, `!`
- Arrow functions (untyped and typed):
  - `f := x => x * 2`
  - `f := (a, b) => a + b`
  - `f := (a: float, b: float): float => a + b`
- Multi-line functions with `return`:
  ```
  f := (x) => {
    y := x * 2
    return y + 1
  }
  ```
- Closures (functions capturing outer scope)
- Array methods via dot syntax: `.map()`, `.filter()`, `.reduce()`, `.sum()`, `.mean()`, `.min()`, `.max()`
- String methods: `.trim()`, `.upper()`, `.lower()`, `.split()`, `.includes()`
- Pipeline operator: `data |> normalize |> mean`
- Gradual type checker (warn mode — type errors printed in yellow, execution continues)
- Type inference: `a := 10` → inferred `int`; `b := 2.5` → inferred `float`; `c := a + b` → inferred `float`
- Float vs int literal distinction: `1` = int, `1.0` = float (uses raw token string)
- Type annotations: `x: int`, `x: float[]`, function params `(n: float)`, return type `: float`
- REPL: `node kai.js` → interactive mode with `:q`, `:env`, `:clear`, `:help`
- File runner: `node kai.js file.kai`

**Built-in stdlib:**

```
# Math
abs, sqrt, floor, ceil, round, pow, log, exp, min, max, rand, randInt, PI, E

# Arrays
len, range, sum, mean, map, filter, reduce, zip, flatten, sort, reverse,
head, tail, unique, includes

# Stats (ML-focused)
std, variance, normalize, dot
```

---

## File Structure

```
kai/
├── kai.js              # Entry point: REPL + file runner
├── package.json        # { "name": "kai", "bin": { "kai": "./kai.js" } }
├── src/
│   ├── lexer.js        # Tokenizer → Token[]
│   ├── ast.js          # AST node class definitions
│   ├── parser.js       # Token[] → AST (recursive descent)
│   ├── interpreter.js  # AST → execution (tree-walking)
│   └── typechecker.js  # AST → type errors (gradual, inference-based)
└── tests/
    ├── basic.kai       # Variables, functions, arrays, pipelines, strings, stats
    ├── typed.kai       # Typed variables, typed functions, type inference
    └── type_errors.kai # Deliberate errors to verify checker catches them
```

---

## Architecture: Compile Pipeline

```
.kai source
  → Lexer (src/lexer.js)       → Token[]
  → Parser (src/parser.js)     → AST
  → TypeChecker (src/typechecker.js)  → annotates AST nodes with ._type, emits warnings
  → Interpreter (src/interpreter.js) → executes, returns result
```

Future pipeline (not built yet):

```
  → IRLowering   → YukiIR (SSA-form, typed, register-based)
  → JIT          → native machine code for hot loops
  → WASM codegen → .wasm for browser/edge
  → Native codegen → binary via LLVM IR or C emit
```

---

## Source Code

### src/lexer.js — Tokenizer

**Token types:** NUMBER, STRING, BOOL, NULL, IDENT, `:=`, `=>`, `+`, `-`, `*`, `/`, `%`,
`==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`, `!`, `|>`, `(`, `)`, `{`, `}`, `[`, `]`,
`,`, `.`, `:`, NEWLINE, EOF

**Key notes:**

- Comments: `#` to end of line, consumed silently
- Numbers: stores both `val` (float) and `raw` (string) on token — needed so `1` → int, `1.0` → float
- Strings: supports `\n`, `\t`, `\\` escape sequences
- `=` alone is an error — must be `:=`, `=>`, or `==`
- `|` alone errors — must be `|>` or `||`

### src/ast.js — AST Nodes

```javascript
NumberLiteral(value)           // .raw stores original string e.g. "1.0"
StringLiteral(value)
BoolLiteral(value)
NullLiteral()
ArrayLiteral(elements)
Identifier(name)
BinaryExpr(op, left, right)
UnaryExpr(op, expr)
AssignStmt(name, value)        // .annotation: string | null e.g. "float" or "float[]"
FuncExpr(params, body)         // params: (string | {name, annotation})[]
                               // .returnAnnotation: string | null
CallExpr(callee, args)
MemberExpr(obj, prop)
BlockExpr(stmts)
IfExpr(cond, then, else)       // defined but not yet parsed
ReturnStmt(value)
PipeExpr(left, right)
Program(body)
```

### src/parser.js — Recursive Descent Parser

**Key methods:**

- `parse()` → `Program`
- `parseStatement()` → handles `return`, typed assign `x: type :=`, plain assign `x :=`, or expression
- `parseTypeAnnotation()` → parses `float`, `int`, `float[]`, `int32[]` etc.
- `parseExpression()` → `parsePipe()` → `parseOr()` → ... → `parseUnary()` → `parseCallMember()` → `parsePrimary()`
- `parsePrimary()` → handles number/string/bool/null literals, arrays `[...]`, blocks `{...}`,
  grouped exprs `(...)`, arrow functions `(params) => body` or `(params): ReturnType => body`,
  single-param arrows `x => body`, identifiers
- `parseParamList()` → handles `(a, b)` and `(a: float, b: int)` — returns `string | {name, annotation}` array
- `parseBlock()` → `{ stmt* }`

**Important**: Arrow function detection inside `(...)` uses try/catch with position save/restore.
Return type annotation after `)`: detects `: TypeName` before `=>`.

**Operator precedence** (low to high):
`|>` → `||` → `&&` → `== !=` → `< > <= >=` → `+ -` → `* / %` → unary `! -` → call/member → primary

### src/interpreter.js — Tree-Walking Interpreter

**Classes:**

- `Environment` — scoped variable map with `parent` chain, `.get(name)`, `.set(name, val)`, `.child()`
- `KaiFunction` — stores `params`, `body` (AST node), `closure` (Environment)
- `ReturnSignal` — wrapper to propagate `return` values up the call stack
- `Interpreter` — has `this.globals` (Environment), `run(ast)`, `eval(node, env)`, `_callFn(fn, args)`

**eval() handles:** all AST node types including PipeExpr (calls right side with left as first arg)

**MemberExpr:** array methods (`.map`, `.filter`, `.reduce`, `.sum`, `.mean`, `.min`, `.max`, etc.)
and string methods (`.trim`, `.upper`, `.lower`, `.split`, etc.) are implemented inline as closures.
Params that are `{name, annotation}` objects get their `.name` extracted before `local.set()`.

### src/typechecker.js — Gradual Type Checker

**Type classes:**

- `Type` (base) — `equals()`, `toString()`, `isNumeric()`, `isFloat()`, `isInt()`
- `PrimitiveType(name)` — int, int32, float, float32, bool, str, null, any, void
- `ArrayType(element)` — e.g. `float[]`
- `TensorType(element, shape)` — e.g. `Tensor[float32, (128, 64)]`, shape=-1 means dynamic dim
- `FunctionType(params[], ret)` — e.g. `(float, float) -> float`
- `UnionType(types[])` — defined, not yet heavily used

**Singletons:** `T_INT`, `T_INT32`, `T_FLOAT`, `T_FLOAT32`, `T_BOOL`, `T_STR`, `T_NULL`, `T_ANY`, `T_VOID`

**TypeChecker class:**

- `check(ast)` → returns `TypeError_[]` (also annotates each AST node with `._type`)
- `inferNode(node, env)` → returns inferred Type, mutates `node._type`
- `_assignable(from, to)` → true if `from` can be used where `to` is expected (handles widening: int→float)
- `_unify(a, b)` → finds common type (int+float→float, any+X→X)
- `_parseAnnotation(string)` → converts annotation string to Type object, handles `[]` suffix
- Error mode: **warn** (default) — errors collected and printed in yellow, execution continues.
  `--strict` flag (in `kai.js`) aborts on errors.

**All AST nodes get `._type` set** after type checking — this will feed into IR lowering / JIT.

---

## What Does NOT Exist Yet (Next Steps)

### Highest priority for ML/AI goal:

**1. Control flow** — `if/else` and `for` loops

```
# Target syntax
if x > 0 {
  print("positive")
} else {
  print("negative")
}

for i in range(0, 10) {
  print(i)
}

for item in collection {
  process(item)
}
```

The `IfExpr` AST node already exists but is not parsed or evaluated yet.

**2. Records / Structs** — needed for ML model configs

```
# Target syntax
model := { layers: [64, 32, 10], lr: 0.001, epochs: 100 }
print(model.lr)
```

Object literals with `.` access. Currently `MemberExpr` handles JS objects but there's no object literal syntax.

**3. Mutation / reassignment**
Currently `:=` always creates new binding. Need `=` for reassignment:

```
x := 0
x = x + 1   # reassign, not redeclare
```

This is important for training loops.

**4. Bytecode VM** — the first performance step
Compile typed AST → register-based bytecode → VM execution.
Target: ~10× faster than tree-walking interpreter.
IR format planned (see architecture doc):

```
fn add(%a: f64, %b: f64) -> f64 {
  %r0 = fadd f64 %a, %b
  ret f64 %r0
}
```

**5. Python bridge** — practical interop now

```
from @py import numpy as np
arr := np.array([1.0, 2.0, 3.0])
```

Practical first pass: child_process + IPC socket to a Python server.
Zero-copy goal: share memory layout with NumPy arrays (row-major, contiguous float32).

**6. Tracing JIT** — after bytecode VM
Record hot loop traces, specialize on observed types, emit SIMD instructions.
Typed `float + float` → single `FADD`, no polymorphic dispatch.

---

## How to Run

```bash
# Requires Node.js (v14+), no npm install needed

# Run a file
node kai.js tests/basic.kai
node kai.js tests/typed.kai
node kai.js tests/type_errors.kai

# Interactive REPL
node kai.js
# kai> x := 42
# kai> add := (a, b) => a + b
# kai> add(3, 7)
# 10
# kai> :env
# kai> :q
```

---

## Example Kai Code (Working Today)

```kai
# Variables
x: int   := 42
pi: float := 3.14159
name: str := "kai"

# Functions
square := (n: float): float => n * n
add    := (a: float, b: float): float => a + b

# Closures
makeAdder := n => x => x + n
add10 := makeAdder(10)
print(add10(5))   # 15

# Arrays + stats
data: float[] := [2.1, 3.5, 2.8, 4.2, 3.1]
print(mean(data))      # 3.14
print(std(data))       # 0.71...
print(normalize(data)) # z-scores

# Pipeline operator
result := data |> normalize |> mean
print(result)  # ~0.0 (mean of z-scores is always 0)

# Typed array methods
doubled := data.map(x => x * 2.0)
big     := data.filter(x => x > 3.0)
```

---

## Key Design Principles to Preserve

1. **No unnecessary keywords** — `:=` not `let`, `=>` not `function`, `#` not `//`
2. **Types are optional but rewarded** — untyped code works, typed code gets checked + will get JIT
3. **Pipeline `|>` is idiomatic** — prefer `data |> f |> g` over `g(f(data))`
4. **Errors should be helpful** — `[TypeError] Line 5: 'bad' declared as int but assigned str`
5. **ML stdlib is built-in** — `mean`, `std`, `normalize`, `dot` are globals, not imports
6. **Distinct from JS** — don't add `var`, `let`, `const`, `function`, `class` keywords
7. **Gradual typing** — never force types on the user, but make them pay off when used

---

## Decisions Still Open

- **Mutation syntax**: `x = x + 1` (Python-style) vs `x <- x + 1` (R-style) vs `mut x := 0` then `x = ...`
- **if/else syntax**: `if cond { } else { }` (decided) vs expression form `if cond then x else y`
- **String interpolation**: `"hello {name}"` or `"hello " + name` (currently only `+`)
- **Import system**: `import math from "kai/math"` or `use math` or something else
- **Error handling**: `try/catch`, `Result<T>` type, or something novel

---

_Last updated: Kai v0.2 — Type system + gradual checker complete. Tree-walking interpreter working._
_Next: Control flow (if/else + for loops) → Records → Bytecode VM → Python bridge → JIT_
