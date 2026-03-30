# Roadmap

The future of Kai language development.

## Vision

Build the **best language for ML/AI development** by combining:
- Python-like simplicity
- JavaScript-like flexibility
- Julia-like performance
- Go-like minimalism

## Version History

### v0.4.0 (Current)
**Status**: ✅ Released

**Features**:
- Complete syntax (variables, functions, control flow)
- Type system with inference
- Arrays and records
- Pipeline operator (`|>`)
- Standard library (math, stats, arrays)
- REPL with commands
- Gradual type checker

**Performance**: Tree-walker interpreter (baseline)

---

### v0.5.0 - Bytecode VM
**Status**: 🔨 In Development

**Timeline**: Q2 2024

**Goals**:
- [ ] Bytecode compiler (AST → bytecode)
- [ ] Stack-based virtual machine
- [ ] 10-50x performance improvement
- [ ] Symbol tables for faster variable lookup
- [ ] Constant folding optimization

**Performance Target**: 10-50x faster than v0.4.0

**Example**:
```kai
# Source code
x := 42
y := x * 2

# Compiles to:
LOAD_CONST 42
STORE_VAR 'x'
LOAD_VAR 'x'
LOAD_CONST 2
MUL
STORE_VAR 'y'
```

---

### v0.6.0 - Python Bridge
**Status**: 📋 Planned

**Timeline**: Q2 2024

**Goals**:
- [ ] Python FFI (Foreign Function Interface)
- [ ] NumPy integration
- [ ] PyTorch/TensorFlow support
- [ ] `import` statement for Python modules
- [ ] Type marshaling (Kai ↔ Python)

**Example**:
```kai
import numpy as np
import torch

# Use NumPy arrays
arr := np.array([1, 2, 3, 4, 5])
result := np.sum(arr)

# Use PyTorch
tensor := torch.tensor([1.0, 2.0, 3.0])
result := tensor.matmul(tensor)
```

**Use Cases**:
- Leverage existing Python ML ecosystem
- Gradual migration from Python codebases
- Access to PyPI packages

---

### v0.7.0 - Tracing JIT
**Status**: 📋 Planned

**Timeline**: Q3 2024

**Goals**:
- [ ] Hot loop detection
- [ ] Trace recording
- [ ] Native code generation
- [ ] Type specialization
- [ ] Inline caching

**Performance Target**: 100-1000x faster for hot code

**How It Works**:
1. Detect loops executed frequently
2. Record operations in loop
3. Compile to native machine code
4. Use specialized types
5. Cache compiled code

**Example**:
```kai
# Cold (interpreted)
for i in 0..10 {
  # Runs once, slow
}

# Hot (JIT-compiled)
for i in 0..1000000 {
  # Runs many times, compiled to native
}
```

**Inspiration**: LuaJIT

---

### v0.8.0 - WebAssembly Target
**Status**: 📋 Planned

**Timeline**: Q3 2024

**Goals**:
- [ ] WASM code generation
- [ ] In-browser REPL
- [ ] Interactive tutorials
- [ ] Client-side ML
- [ ] npm package distribution

**Use Cases**:
```kai
// In-browser ML
model := load_model("model.kai")
prediction := model.predict(input_data)

// Interactive examples
// Click "Run" → executes in browser
data := [1, 2, 3, 4, 5]
result := data |> normalize |> mean
```

**Benefits**:
- Zero-installation demos
- Fast, secure web apps
- Tutorial code execution

---

### v0.9.0 - C FFI
**Status**: 📋 Planned

**Timeline**: Q4 2024

**Goals**:
- [ ] C function declarations
- [ ] BLAS/LAPACK integration
- [ ] CUDA support
- [ ] Memory management
- [ ] Foreign types

**Example**:
```kai
// Declare C function
extern c {
  fn blas_dgemm(
    transa: c_int,
    transb: c_int,
    m: c_int,
    n: c_int,
    k: c_int,
    alpha: c_double,
    a: *c_double,
    lda: c_int,
    b: *c_double,
    ldb: c_int,
    beta: c_double,
    c: *c_double,
    ldc: c_int
  ): c_int
}

// Use BLAS for matrix multiplication
result := blas_dgemm(/* ... */)
```

**Use Cases**:
- High-performance linear algebra
- GPU computing (CUDA)
- System integration

---

### v1.0.0 - Stable Release
**Status**: 📋 Planned

**Timeline**: Q4 2024

**Goals**:
- [ ] Native code compilation
- [ ] Stable language specification
- [ ] Standard library v1.0
- [ ] Language server protocol (LSP)
- [ ] IDE support
- [ ] Package manager

**Features**:
- Ahead-of-time (AOT) compilation
- Standalone binaries
- LLVM backend (or custom)
- Maximum performance

**Example**:
```bash
# Compile to native binary
kai build my_app.kai -o my_app

# Run as native executable
./my_app
```

---

## Future Possibilities (Post-v1.0)

### Advanced Type System
- Algebraic data types (ADTs)
- Pattern matching
- Type classes (traits)
- Dependent types

### Concurrency
- Async/await
- Coroutines
- Actor model
- Parallel collections

### ML-Specific Features
- Native tensor types
- Auto-differentiation
- Gradient computation
- Neural network DSL

### Ecosystem
- Package registry
- Standard library expansion
- Cloud platform
- CI/CD integration

## Performance Goals

| Version | Implementation | Speedup vs v0.4 |
|---------|---------------|-----------------|
| v0.4.0 | Tree-walker | 1x (baseline) |
| v0.5.0 | Bytecode VM | 10-50x |
| v0.7.0 | Tracing JIT | 100-1000x (hot code) |
| v1.0.0 | Native | 100-1000x (all code) |

## Get Involved

Want to help build the future of Kai?

1. **Pick a feature** from the roadmap
2. **Join the discussion** on GitHub
3. **Read the [Contributing Guide](/internals/contributing)**
4. **Open a PR** with your implementation

## Timeline Summary

```
2024 Q2:  v0.5.0 (Bytecode VM)    → v0.6.0 (Python Bridge)
2024 Q3:  v0.7.0 (Tracing JIT)    → v0.8.0 (WASM)
2024 Q4:  v0.9.0 (C FFI)          → v1.0.0 (Stable)
```

## Notes

- Timeline is approximate and subject to change
- Community feedback influences priorities
- Quality over speed - we may delay features
- See [CHANGELOG](/releases/v0.4.0) for release details

---

**Want to contribute?** See [Contributing Guide](/internals/contributing) or [Architecture](/internals/architecture).
