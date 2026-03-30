# Contributing

Want to contribute to Kai? We'd love your help!

## Ways to Contribute

### Report Bugs

Found a bug? [Open an issue](https://github.com/xeron/kai/issues) with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment info

### Suggest Features

Have an idea? [Open an issue](https://github.com/xeron/kai/issues) to discuss it first.

### Submit Code

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Add tests if applicable
5. Commit: `git commit -m "Add feature"`
6. Push: `git push origin feature/my-feature`
7. Open a Pull Request

### Write Documentation

Help improve the docs! See [Documentation Guide](#) for details.

### Write Tests

More tests = better code! Add tests in `tests/` directory.

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/kai.git
cd kai

# Install dependencies
npm install

# Run tests
npm test

# Run REPL
npm run repl

# Build docs
npm run docs:dev
```

## Code Style

- Use 2 spaces for indentation
- Use `:=` for declaration, `=` for mutation
- Add type annotations to public APIs
- Write tests for new features
- Follow existing patterns

## Testing

```bash
# Run all tests
npm test

# Run specific test file
node kai.js tests/basic.kai
```

## Project Structure

```
kai/
├── src/              # Source code
├── tests/           # Test files
├── docs/            # Documentation
├── kai.js           # CLI entry point
└── package.json     # Project config
```

## Pull Request Guidelines

- One feature per PR
- Update documentation
- Add tests for new features
- Ensure all tests pass
- Write clear commit messages

## Getting Help

- Read the [Architecture](/internals/architecture)
- Check existing [Issues](https://github.com/xeron/kai/issues)
- Join [Discussions](https://github.com/xeron/kai/discussions)

## License

By contributing, you agree your code will be under the MIT License.

## Thanks!

Contributors get credited in the release notes.

See [CONTRIBUTORS.md](https://github.com/xeron/kai/blob/main/CONTRIBUTORS.md) for the full list.
