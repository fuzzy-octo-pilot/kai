# Installation

Get Kai up and running on your system in minutes.

## Prerequisites

- **Node.js** >= 14.0.0
- **Git** (for cloning the repository)
- A terminal or command prompt

## Install from Source

1. **Clone the repository**:

```bash
git clone https://github.com/xeron/kai.git
cd kai
```

2. **Install dependencies** (if you want to work on the language itself):

```bash
yarn install
# or
npm install
```

That's it! Kai is written in pure JavaScript, so there's no compilation step.

## Verify Installation

Test that Kai is working:

```bash
node kai.js --version
```

Or run the test suite:

```bash
node kai.js tests/basic.kai
```

## Running Kai

### Interactive REPL

Start the REPL for interactive development:

```bash
node kai.js
```

Try some code:

```kai
> x := 42
42
> square := (n) => n * n
(Function)
> square(x)
1764
> [1, 2, 3].mean()
2.0
```

### Run a Kai File

Create a file `hello.kai`:

```kai
# hello.kai
print("Hello, Kai!")

x := 42
print("x:", x)

# Arrow function
add := (a, b) => a + b
print("3 + 4 =", add(3, 4))
```

Run it:

```bash
node kai.js hello.kai
```

Output:

```
Hello, Kai!
x: 42
3 + 4 = 7
```

### Execute from stdin

Pipe code to Kai:

```bash
echo 'print("Hello from stdin!")' | node kai.js
```

## Editor Support

### VS Code

1. Install the **Kai Language** extension (coming soon)
2. Or use a generic syntax highlighting theme

For now, you can use **JavaScript** or **TypeScript** syntax highlighting as a temporary workaround.

### Vim/Neovim

Add to your `.vimrc` or `init.vim`:

```vim
autocmd BufRead,BufNewFile *.kai set syntax=javascript
```

### Emacs

Add to your `.emacs`:

```elisp
(add-to-list 'auto-mode-alist '("\\.kai\\'" . javascript-mode))
```

## Development Setup

If you want to contribute to Kai itself:

1. **Fork and clone** the repository
2. **Install dependencies**:

```bash
yarn install
```

3. **Run tests**:

```bash
yarn test
# or
node kai.js tests/basic.kai
```

4. **Build documentation** (if working on docs):

```bash
yarn docs:dev
```

See [Contributing Guide](/internals/contributing) for more details.

## Troubleshooting

### "node: command not found"

Install Node.js from [nodejs.org](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install 18
nvm use 18
```

### "Permission denied" on kai.js

Make the file executable:

```bash
chmod +x kai.js
```

Then run:

```bash
./kai.js
```

### REPL is not working

Make sure you're running Node.js 14 or higher:

```bash
node --version
```

## Next Steps

Now that Kai is installed:

1. **[Hello World](/guide/hello-world)** - Your first program
2. **[REPL Basics](/guide/repl-basics)** - Interactive development
3. **[Language Basics](/guide/basics/variables)** - Learn the syntax
4. **[Tutorials](/tutorials/learn-kai-with-tests)** - Test-driven learning

## Platform-Specific Notes

### Windows

- Use PowerShell or Git Bash
- Make sure Node.js is in your PATH
- You might need to use `node kai.js` instead of just `kai`

### macOS

- Install Node.js via Homebrew: `brew install node`
- You might need to use `sudo` for global installation

### Linux

- Use your distribution's package manager or `nvm`
- No special requirements

---

**Need help?** Check the [FAQ](/community/faq) or open an issue on GitHub.
