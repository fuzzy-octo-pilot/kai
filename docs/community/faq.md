# FAQ

Frequently asked questions about Kai.

## General

### What is Kai?

Kai is a minimal, elegant programming language designed for ML/AI development.

### Why create Kai?

To combine Python's simplicity with JavaScript's flexibility, optimized for data science.

### Is Kai ready for production?

Kai is currently in active development (v0.4.0). It's great for learning and experimentation but not yet recommended for production use.

## Installation & Setup

### How do I install Kai?

```bash
git clone https://github.com/xeron/kai.git
cd kai
node kai.js
```

### What are the requirements?

Node.js >= 14.0.0

## Language Features

### Does Kai have classes?

No. Kai uses records and functions instead.

### Is Kai statically typed?

Kai has gradual typing - types are optional but recommended.

### Can I use existing libraries?

Not yet. Python bridge is planned for v0.6.0.

## Performance

### How fast is Kai?

Current version uses a tree-walker interpreter (baseline performance). Bytecode VM (10-50x faster) is planned for v0.5.0.

### Will Kai be as fast as Python?

The goal is to match Julia's performance through JIT compilation (planned v0.7.0).

## Learning

### How do I learn Kai?

Start with [Learn Kai with Tests](/tutorials/learn-kai-with-tests) - our test-driven tutorial series.

### Is Kai good for beginners?

Yes! The minimal syntax and REPL make it great for learning programming.

## Contributing

### How can I help?

See [Contributing Guide](/internals/contributing).

### Can I submit features?

Yes! Open an issue or PR on GitHub.

## Roadmap

### What's coming next?

- v0.5.0: Bytecode VM
- v0.6.0: Python bridge
- v0.7.0: Tracing JIT
- v0.8.0: WebAssembly

See full [Roadmap](/internals/roadmap).

## More Questions?

- Open an issue on [GitHub](https://github.com/xeron/kai/issues)
- Start a [Discussion](https://github.com/xeron/kai/discussions)
- Check the [Documentation](/guide/introduction)
