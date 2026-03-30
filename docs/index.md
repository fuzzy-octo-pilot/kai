---
layout: home

hero:
  name: Kai
  text: A minimal, elegant language for ML/AI
  tagline: Python-like simplicity with JavaScript-style flexibility. Built for data science, optimized for developers.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/xeron/kai

features:
  - title: 🚀 Minimal Syntax
    details: Clean, expressive syntax inspired by Go, Python, and JavaScript. Write more with less code using arrow functions, walrus operator, and pipeline operators.
  - title: 🔢 ML-First Design
    details: Built-in statistics (mean, std, normalize), linear algebra (dot product), and data pipelines. Perfect for data science and machine learning.
  - title: 🎯 Gradual Types
    details: Types are optional but powerful. Start simple, add types for safety and future JIT optimizations.
  - title: ⚡ Fast Execution
    details: Tree-walker interpreter today, bytecode VM and tracing JIT tomorrow. Roadmap to WASM and native compilation.
  - title: 🔌 Interoperability
    details: Seamless Python bridge for NumPy integration, planned C FFI for BLAS and CUDA libraries.
  - title: 📊 Data Pipelines
    details: Native pipeline operator (|>) for elegant data transformation and functional programming.
---

## Quick Start

Install Kai and start building ML applications in minutes:

```bash
# Clone the repository
git clone https://github.com/xeron/kai.git
cd kai

# Run the REPL
node kai.js

# Run a file
node kai.js examples/data-analysis.kai
```

## Learn Kai with Tests

Follow our test-driven tutorial series to master Kai step by step:

1. **[Variables & Types](/tutorials/chapters/01-variables)** - Learn the basics
2. **[Functions](/tutorials/chapters/02-functions)** - Arrow functions and closures
3. **[Control Flow](/tutorials/chapters/03-control-flow)** - Conditionals and loops
4. **[Collections](/tutorials/chapters/04-collections)** - Arrays and records
5. **[Pipelines](/tutorials/chapters/05-pipelines)** - Functional data transformation
6. **[Type System](/tutorials/chapters/06-types)** - Gradual typing
7. **[ML Features](/tutorials/chapters/07-ml)** - Statistics and linear algebra

## Roadmap

Kai is evolving rapidly. Here's what's coming:

- **v0.5.0** - Bytecode VM for 10-50x performance improvement
- **v0.6.0** - Python bridge for NumPy integration
- **v0.7.0** - Tracing JIT compiler
- **v0.8.0** - WebAssembly target
- **v0.9.0** - C FFI for BLAS/CUDA
- **v1.0.0** - Stable release with native compilation

## Contributing

We welcome contributions! Check out the [Contributing Guide](/internals/contributing) and [Architecture Overview](/internals/architecture) to get started.
