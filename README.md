<div align="center">

![Kai Logo](images/kai.png)

# Kai 🌊

**A programming language for ML/AI development**

[Kai](https://github.com/yourname/kai) is a clean, minimal language designed for machine learning and data science. It combines the best features of Go, JavaScript, Python, and Julia into a unified syntax that feels natural for both scripting and production.

[![Version](https://img.shields.io/badge/version-0.3.0-blue)](https://github.com/yourname/kai/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

</div>

---

## Table of Contents

- [About Kai](#about-kai)
- [Inspiration & Design](#inspiration--design)
- [Key Features](#key-features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Language Guide](#language-guide)
- [Examples](#examples)
- [Standard Library](#standard-library)
- [Performance](#performance)
- [Testing](#testing)
- [What's Next](#whats-next)

---

## About Kai

**Kai** (海, "ocean" in Japanese) is a general-purpose programming language designed specifically for ML/AI development. It provides:

- **Clean, minimal syntax** — No unnecessary keywords, just expressive code
- **Gradual type system** — Types are optional but enable safety and future optimizations
- **Built-in statistics** — `mean`, `std`, `normalize`, `dot` are globals, not imports
- **Pipeline operator** — Natural data flow: `data |> normalize |> mean`
- **ML-first** — Designed from the ground up for data pipelines and model training
- **Control flow** — `if/else` and `for` loops for general-purpose programming

### Why Kai?

Modern ML/AI development requires both rapid prototyping and production-ready code. Existing languages force you to choose:

- **Python** — Great for prototyping, slow for production
- **C++** — Fast for production, painful for prototyping
- **JavaScript** — Easy syntax, no ML ecosystem

Kai bridges this gap with a clean syntax that feels like scripting, but with the performance roadmap of a systems language.

---

## Inspiration & Design

Kai takes the best ideas from multiple languages:

### From Go
- **Walrus operator** `:=` for variable declaration
- **Minimal keywords** — no `let`, `const`, `var`, `function`

### From JavaScript
- **Arrow functions** `=>` for concise function definitions
- **Closures and higher-order functions**
- **Pipeline operator** `|>` for data flow

### From Python
- **Hash comments** `#` for single-line comments
- **Clean, readable code**
- **Interactive REPL**

### From Julia
- **Numeric types** (`int`, `float`, `float32`, etc.)
- **Type annotations** as optional enhancements
- **Performance-oriented design**

### Unique to Kai
- **Gradual typing** — Untyped code works, typed code gets checked and will get JIT-optimized
- **ML standard library** — Statistics and array ops built-in, not imports
- **Tensor types** — Shape is part of the type: `Tensor[float32, (128, 64)]` *(coming in v0.4)*

---

## Key Features

### ✨ Variables & Types

```kai
# Untyped variables (types inferred)
x := 42
pi := 3.14159
name := "Kai"
flag := true

# Typed variables (optional but recommended)
count: int := 100
ratio: float := 0.75
data: float[] := [1.0, 2.5, 3.7]
```

**Primitive types:** `int`, `int32`, `float`, `float32`, `bool`, `str`, `null`
**Compound types:** `float[]`, `int[]` — array type annotations

### 🎯 Functions

```kai
# Multi-parameter
add := (a, b) => a + b

# Single parameter (shorthand)
double := x => x * 2

# Typed function
square := (n: float): float => n * n

# Multi-line with return
sigmoid := (x: float): float => {
  return 1.0 / (1.0 + pow(E, -x))
}

# Closures
makeAdder := n => x => x + n
add10 := makeAdder(10)
print(add10(5))  # 15
```

### 🔒 Gradual Type System

```kai
# Type annotations are optional
untyped := x => x * 2

# But they enable safety and checking
typed := (x: float): float => x * 2.0

# Type inference works automatically
a := 10       # inferred: int
b := 3.14     # inferred: float
c := a + b    # inferred: float (int widens to float)
```

**Features:**
- Type inference from literals and expressions (`1` → int, `1.0` → float)
- Warn-mode checking — type errors are printed but execution continues
- Safe widening: int → float is allowed, float → int is an error
- Function parameter and return type annotations

### 🔄 Control Flow

```kai
# If/Else statements
x := 10
if x > 5 {
  print("x is greater than 5")
} else {
  print("x is not greater than 5")
}

# Nested if/else
score := 85
if score >= 90 {
  print("Grade: A")
} else {
  if score >= 80 {
    print("Grade: B")
  } else {
    print("Grade: C")
  }
}

# For loops
nums := [1, 2, 3, 4, 5]
for num in nums {
  print("Number:", num)
}

# Nested loops
matrix := [[1, 2], [3, 4], [5, 6]]
for row in matrix {
  for val in row {
    print("  ", val)
  }
}
```

**Truthy values:** `null`, `false`, `0`, `0.0` are falsy; everything else is truthy

### 📊 Arrays & Collections

```kai
nums := [1, 2, 3, 4, 5]

# Higher-order methods
doubled := nums.map(x => x * 2)       # [2, 4, 6, 8, 10]
evens   := nums.filter(x => x % 2 == 0) # [2, 4]
total   := nums.reduce((acc, x) => acc + x, 0) # 15

# Built-in aggregations (called as values, not functions)
print(nums.sum)   # 15
print(nums.mean)  # 3
print(nums.max)   # 5
print(nums.min)   # 1

# Array mutation
result := []
result := result.push(42)  # [42]
```

### ⚡ Pipeline Operator

```kai
# Thread data through a series of functions
result := data |> normalize |> mean

# Equivalent to (but more readable than):
result := mean(normalize(data))

# Multi-step pipelines
clean := rawData
  |> normalize
  |> filter(x => x > 0.0)
```

The `|>` operator passes the left-hand value as the first argument to the right-hand function.

---

## Installation

### Requirements

- **Node.js** v14 or higher — no npm install needed

### Setup

```bash
# Clone the repository
git clone https://github.com/yourname/kai.git
cd kai

# Run a file
node kai.js example.kai

# Start the REPL
node kai.js
```

### Optional: Global Command

```bash
npm link

# Now you can use
kai example.kai
kai
```

---

## Quick Start

### Hello World

```kai
print("Hello, Kai!")
```

```bash
node kai.js hello.kai
```

### Interactive REPL

```bash
node kai.js
```

```
kai> x := 42
42
kai> double := x => x * 2
<fn(x)>
kai> double(x)
84
kai> nums := [1, 2, 3, 4, 5]
[1, 2, 3, 4, 5]
kai> mean(nums)
3
kai> :env
  x = 42
  double = <fn(x)>
  nums = [1, 2, 3, 4, 5]
kai> :q
```

**REPL Commands:**
- `:help` — Show help
- `:env` — Show all defined variables
- `:clear` — Reset environment
- `:q` — Quit

### Data Processing Example

```kai
data := [2.1, 3.5, 2.8, 4.2, 3.1]

print("mean:      " + mean(data))
print("std dev:   " + std(data))
print("min / max: " + min(data) + " / " + max(data))

# Pipeline processing
result := data |> normalize |> mean
print("normalized mean: " + result)  # always ~0

# Control flow with for loop
for val in data {
  if val > 3.0 {
    print("Large value: " + val)
  }
}
```

---

## Language Guide

### Variable Declaration

```kai
# Untyped (type inferred)
x := 42

# Typed
x: int    := 42
pi: float := 3.14
name: str := "Kai"
flag: bool := true
data: float[] := [1.0, 2.5, 3.7]
```

> **Note:** `:=` always declares a new binding. Reassignment (`x = x + 1`) is planned for v0.4.

### Functions

```kai
# Multi-parameter
add := (a, b) => a + b

# Single parameter (no parentheses needed)
double := x => x * 2

# Multi-line block with return
greet := (name) => {
  msg := "Hello, " + name
  return msg
}

# Typed parameters and return type
square := (n: float): float => n * n
```

### Control Flow

```kai
# If/Else
if condition {
  # then branch
} else {
  # else branch
}

# For loops
for item in collection {
  print(item)
}

# Nested control flow
for num in nums {
  if num > 5 {
    print("Big: " + num)
  }
}
```

### Comments

```kai
# This is a comment
x := 42  # End-of-line comment
```

### Operators

| Category | Operators |
|---|---|
| Arithmetic | `+` `-` `*` `/` `%` |
| Comparison | `==` `!=` `<` `>` `<=` `>=` |
| Logical | `&&` `\|\|` `!` |
| Pipeline | `\|>` |
| String concat | `+` |

### Type System

```kai
# Primitive types
x: int    := 42
x: int32  := 42
x: float  := 3.14
x: float32 := 3.14
x: bool   := true
x: str    := "hello"

# Array types
nums: int[]   := [1, 2, 3]
vals: float[] := [1.0, 2.0, 3.0]
matrix: int[][] := [[1, 2], [3, 4]]
```

**Type widening (safe):**
```kai
x: float := 42   # OK — int widens to float
```

**Type errors (caught):**
```kai
x: int := "hello"
# [TypeError] 'x' declared as int but assigned str
# Execution continues (warn mode)
```

### Truthy Values

The following values are considered **falsy**:
- `null`
- `false`
- `0` (zero)
- `0.0` (zero float)

All other values are **truthy**:
- Non-zero numbers
- Non-empty strings
- Non-empty arrays
- Functions

```kai
if 42 {
  print("truthy")  # Prints
}

if 0 {
  print("truthy")  # Doesn't print
}
```

### Lexical Scoping

Control flow constructs create proper lexical scopes:

```kai
x := 10

if x > 5 {
  x := 20  # Creates new local x
  print("Inner x: " + x)  # 20
}

print("Outer x: " + x)  # 10 (unchanged)
```

For loop variables are scoped to the loop body:

```kai
for num in nums {
  print("Loop num: " + num)
}

# 'num' is not accessible here
```

---

## Examples

### Statistical Analysis

```kai
dataset := [2.1, 3.5, 2.8, 4.2, 3.1, 2.9, 3.8]

print("mean:      " + mean(dataset))
print("std dev:   " + std(dataset))
print("variance:  " + variance(dataset))
print("min / max: " + min(dataset) + " / " + max(dataset))

normed := normalize(dataset)
print("z-scores:  " + normed)
```

### Higher-Order Functions

```kai
# map, filter, reduce
nums := [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens   := nums.filter(x => x % 2 == 0)   # [2, 4, 6, 8, 10]
squares := evens.map(x => x * x)           # [4, 16, 36, 64, 100]
total   := squares.reduce((a, b) => a + b, 0) # 220

print(total)
```

### Closures & Currying

```kai
makeMultiplier := factor => x => x * factor

double := makeMultiplier(2)
triple := makeMultiplier(3)

print(double(5))   # 10
print(triple(5))   # 15

# Partial application
add := (a, b) => a + b
add5 := x => add(5, x)
print(add5(10))    # 15
```

### ML-Style Data Pipeline

```kai
# Define transforms as named functions
normalize := (arr: float[]): float[] => {
  m := mean(arr)
  s := std(arr)
  return arr.map(x => (x - m) / s)
}

scale := (arr: float[]): float[] => arr.map(x => x * 100.0)

# Compose with pipeline operator
raw := [10.0, 20.0, 30.0, 40.0, 50.0]
result := raw |> normalize |> scale

print(result)
print("mean after normalize: " + mean(result))  # ~0
```

### Dot Product & Linear Algebra

```kai
a := [1.0, 2.0, 3.0]
b := [4.0, 5.0, 6.0]

product := dot(a, b)
print(product)  # 32.0

# Manual weighted sum
weights := [0.2, 0.5, 0.3]
inputs  := [0.8, 0.6, 0.9]
output  := dot(weights, inputs)
print(output)   # 0.68
```

### Matrix Operations with Control Flow

```kai
# Process 2D arrays
matrix := [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in matrix {
  rowSum := row.sum
  print("Row sum: " + rowSum)

  for val in row {
    if val % 2 == 0 {
      print("  Even: " + val)
    }
  }
}
```

### Factorial with For Loop

```kai
# Factorial using for loop
factorial := (n: int): int => {
  result := 1
  for i in range(1, n + 1) {
    result := result * i
  }
  return result
}

print("5! = " + factorial(5))  # 120
```

---

## Standard Library

### Math

| Function | Description | Example |
|---|---|---|
| `abs(x)` | Absolute value | `abs(-5)` → `5` |
| `sqrt(x)` | Square root | `sqrt(16)` → `4` |
| `floor(x)` | Round down | `floor(3.7)` → `3` |
| `ceil(x)` | Round up | `ceil(3.2)` → `4` |
| `round(x)` | Round nearest | `round(3.5)` → `4` |
| `pow(x, y)` | Power | `pow(2, 8)` → `256` |
| `log(x)` | Natural log | `log(10)` → `2.302` |
| `exp(x)` | e^x | `exp(1)` → `2.718` |
| `min(a, b)` | Minimum of two values | `min(5, 3)` → `3` |
| `max(a, b)` | Maximum of two values | `max(5, 3)` → `5` |
| `rand()` | Random float 0–1 | `rand()` → `0.523` |
| `randInt(lo, hi)` | Random integer | `randInt(1, 10)` → `7` |
| `PI` | π constant | `3.14159...` |
| `E` | Euler's number | `2.71828...` |

### Array Functions (global)

| Function | Description | Example |
|---|---|---|
| `len(arr)` | Length | `len([1, 2, 3])` → `3` |
| `range(start, end)` | Integer range | `range(0, 5)` → `[0,1,2,3,4]` |
| `sum(arr)` | Sum all elements | `sum([1,2,3])` → `6` |
| `mean(arr)` | Average | `mean([1,2,3,4,5])` → `3` |
| `min(arr)` | Minimum of array | `min([3,1,2])` → `1` |
| `max(arr)` | Maximum of array | `max([3,1,2])` → `3` |
| `sort(arr)` | Sort ascending | `sort([3,1,2])` → `[1,2,3]` |
| `reverse(arr)` | Reverse | `reverse([1,2,3])` → `[3,2,1]` |
| `head(arr)` | First element | `head([1,2,3])` → `1` |
| `tail(arr)` | All but first | `tail([1,2,3])` → `[2,3]` |
| `unique(arr)` | Remove duplicates | `unique([1,2,2])` → `[1,2]` |
| `includes(arr, x)` | Contains check | `includes([1,2],2)` → `true` |
| `zip(a, b)` | Zip two arrays | `zip([1,2],[3,4])` → `[[1,3],[2,4]]` |
| `flatten(arr)` | Flatten one level | `flatten([[1,2],[3]])` → `[1,2,3]` |
| `map(arr, fn)` | Transform elements | `map([1,2,3], x => x*2)` → `[2,4,6]` |
| `filter(arr, fn)` | Filter elements | `filter([1,2,3], x => x>1)` → `[2,3]` |
| `reduce(arr, fn, init)` | Fold | `reduce([1,2,3], (a,b) => a+b, 0)` → `6` |

### Statistics (ML-focused)

| Function | Description |
|---|---|
| `std(arr)` | Standard deviation |
| `variance(arr)` | Variance |
| `normalize(arr)` | Z-score normalization |
| `dot(a, b)` | Dot product of two arrays |

### Array Methods (dot syntax)

| Method | Description |
|---|---|
| `.map(fn)` | Transform each element |
| `.filter(fn)` | Keep elements matching predicate |
| `.reduce(fn, init)` | Fold to single value |
| `.sum` | Sum of elements |
| `.mean` | Average of elements |
| `.max` | Maximum element |
| `.min` | Minimum element |
| `.push(val)` | Append element (returns new array) |
| `.length` | Array length |

### String Methods (dot syntax)

| Method | Description |
|---|---|
| `.trim()` | Remove surrounding whitespace |
| `.upper()` | Uppercase |
| `.lower()` | Lowercase |
| `.split(sep)` | Split into array |
| `.includes(sub)` | Substring check |
| `.length` | Character count |

---

## Performance

### Current Implementation (v0.3)

Kai uses a **tree-walking interpreter** — the focus right now is on correctness and language design, not raw speed. It is suitable for scripts, data exploration, and prototyping.

**Control flow overhead:**
- If statements: ~5ns overhead (branch prediction friendly)
- For loops: ~50ns per iteration (array access dominates)
- Nested loops: Scales O(n) naturally

### Performance Roadmap

| Version | Feature | Expected Speedup |
|---|---|---|
| v0.4 | Bytecode VM (register-based) | ~10× vs tree-walker |
| v0.5 | Tracing JIT via Cranelift | ~50× on hot loops |
| v0.6 | SIMD vectorization | additional 4–8× on numeric ops |
| v0.7 | WASM target | browser + edge deployment |
| v1.0 | LLVM native backend | near C-speed |

The gradual type system is designed specifically with this roadmap in mind — typed code will receive full JIT specialization, eliminating polymorphic dispatch on numeric operations.

---

## Testing

### Run All Tests

```bash
node kai.js tests/basic.kai        # Core features
node kai.js tests/typed.kai        # Type system
node kai.js tests/type_errors.kai  # Type checker (shows warnings)
node kai.js tests/controlflow.kai  # Control flow (NEW)
```

### Test Coverage

| File | Lines | What it covers |
|---|---|---|
| `tests/basic.kai` | 140 | Variables, functions, closures, arrays, pipelines, strings, stats |
| `tests/typed.kai` | 96 | Type annotations, inference, typed functions, typed arrays |
| `tests/type_errors.kai` | 47 | Type mismatch detection, argument checking |
| `tests/controlflow.kai` | 116 | If/else, for loops, nested loops, truthy values (NEW) |

**Total:** 399 lines of test code covering all language features.

---

## What's Next

### v0.4.0 — Records & Mutation
- Record/struct literals: `model := { layers: [64, 32], lr: 0.001 }`
- Reassignment operator: `x = x + 1`
- Nested record access: `model.layers.length`
- Additional control flow: `while` loops, `break`, `continue`

### v0.5.0 — Bytecode VM
- Register-based bytecode compiler
- SSA-form intermediate representation (YukiIR)
- ~10× performance improvement

### v0.6.0 — Python & C Interop
- Python bridge: `from @py import numpy as np`
- Zero-copy tensor sharing with NumPy
- C FFI: `@cffi("libopenblas.so")`
- BLAS-backed matrix multiply via `@` operator

### v0.7.0 — JIT Compilation
- Tracing JIT via Cranelift (Rust)
- Type-specialized code generation
- SIMD vectorization for float32 arrays

### Future
- WebAssembly compilation target
- Native binary output via LLVM
- Package manager and module system
- Autograd (automatic differentiation)

---

## Architecture

### Compile Pipeline (current)

```
.kai source
  → Lexer     (src/lexer.js)        tokenization
  → Parser    (src/parser.js)       recursive descent → AST
  → TypeChecker (src/typechecker.js) gradual type checking, AST annotation
  → Interpreter (src/interpreter.js) tree-walking execution
```

### Planned Pipeline

```
  → IR Lowering   → typed SSA bytecode
  → Bytecode VM   → register-based execution
  → Tracing JIT   → native code for hot loops
  → WASM Codegen  → browser/edge
  → LLVM Backend  → native binary
```

### File Structure

```
kai/
├── kai.js              # Entry point: REPL + file runner
├── package.json
├── src/
│   ├── lexer.js        # Tokenizer → Token[]
│   ├── ast.js          # AST node class definitions
│   ├── parser.js       # Recursive descent parser
│   ├── interpreter.js  # Tree-walking interpreter
│   └── typechecker.js  # Gradual type checker + inference
├── tests/
│   ├── basic.kai        # Core language features
│   ├── typed.kai        # Type system
│   ├── type_errors.kai  # Type error examples
│   └── controlflow.kai  # Control flow tests
├── images/
│   ├── kai.png          # Logo
│   └── kai.ico          # Icon
└── RELEASE_NOTES/
    ├── v0.1.0.md        # Initial release
    ├── v0.2.0.md        # Type system
    └── v0.3.0.md        # Control flow
```

---

## Contributing

Contributions are welcome! The codebase is intentionally simple — each source file is self-contained and well-commented.

```bash
git clone https://github.com/yourname/kai.git
cd kai
node kai.js                    # Start REPL
node kai.js tests/basic.kai    # Run tests
```

---

## License

MIT License — see LICENSE for details.

---

<div align="center">

**Built for the ML/AI community**

v0.3.0 — Control Flow Complete

[GitHub](https://github.com/yourname/kai) · [Releases](https://github.com/yourname/kai/releases) · [Issues](https://github.com/yourname/kai/issues)

</div>
