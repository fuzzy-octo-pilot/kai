# REPL Basics

The REPL (Read-Eval-Print Loop) is an interactive shell for experimenting with Kai code.

## Starting the REPL

```bash
node kai.js
```

You'll see:

```
Kai v0.4.0 - Type :help for help
kai>
```

## Basic Usage

### Simple Expressions

```kai
kai> 2 + 2
4

kai> "Hello" + " " + "World"
Hello World

kai> [1, 2, 3].map(x => x * 2)
[2, 4, 6]
```

### Variable Declaration

```kai
kai> x := 42
42

kai> x
42

kai> x = 100
100

kai> x
100
```

### Defining Functions

```kai
kai> square := (n) => n * n
(Function)

kai> square(5)
25

kai> add := (a, b) => a + b
(Function)

kai> add(10, 20)
30
```

### Array Operations

```kai
kai> numbers := [1, 2, 3, 4, 5]
[1, 2, 3, 4, 5]

kai> numbers.sum()
15

kai> numbers.mean()
3.0

kai> numbers.filter(x => x > 2)
[3, 4, 5]
```

## REPL Commands

The REPL has special commands (all start with `:`):

### `:help` - Show Help

```kai
kai> :help
Available commands:
  :help     Show this help message
  :env      Show current environment
  :clear    Clear the environment
  :q or :quit  Exit the REPL
```

### `:env` - Show Environment

See all defined variables:

```kai
kai> x := 10
10

kai> name := "Kai"
Kai

kai> :env
Environment:
  x = 10
  name = "Kai"
```

### `:clear` - Clear Environment

Reset everything:

```kai
kai> :clear
Environment cleared

kai> :env
Environment: (empty)
```

### `:q` or `:quit` - Exit

Quit the REPL:

```kai
kai> :q
Goodbye!
```

Or use `Ctrl+C` or `Ctrl+D`.

## Tips & Tricks

### Multi-line Input

Press `Enter` after an opening brace or incomplete expression:

```kai
kai> square := (n) => {
...   result := n * n
...   return result
... }
(Function)

kai> square(5)
25
```

### Accessing Previous Results

Use `_` to reference the last result:

```kai
kai> 10 + 20
30

kai> _ * 2
60

kai> _ + 10
70
```

### Inline Code

You can pipe code directly to the REPL:

```bash
echo 'print("Hello from stdin!")' | node kai.js
```

Output:

```
Hello from stdin!
```

## Common Workflows

### Quick Calculations

```kai
kai> 2.5 * 4
10.0

kai> sqrt(25)
5.0

kai> PI
3.14159...
```

### Testing Code Snippets

```kai
kai> data := [1, 2, 3, 4, 5]
[1, 2, 3, 4, 5]

kai> data |> normalize |> mean
# Test pipeline operations
0.5
```

### Exploring the Standard Library

```kai
kai> abs(-5)
5

kai> max(10, 20)
20

kai> rand()
0.723...
```

## REPL vs Files

| Feature | REPL | Files |
|---------|------|-------|
| Quick experiments | ✅ Best | ❌ Slower |
| Testing ideas | ✅ Instant | ❌ Edit-run cycle |
| Learning | ✅ Interactive | ❌ Static |
| Saving code | ❌ Lost on exit | ✅ Permanent |
| Large programs | ❌ Cumbersome | ✅ Organized |
| Sharing | ❌ Can't share | ✅ Easy to share |

## Example Sessions

### Data Analysis Session

```kai
kai> values := [23, 45, 67, 89, 12]
[23, 45, 67, 89, 12]

kai> avg := values.mean()
47.2

kai> std := values.stddev()
28.78...

kai> normalized := values.normalize()
[0.13, 0.42, 0.72, 1.0, 0.0]
```

### ML Pipeline Session

```kai
kai> data := [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

kai> data |> filter(x => x > 5) |> mean
8.0

kai> data |> map(x => x * 2) |> sum
110.0
```

### Function Development Session

```kai
kai> area := (w, h) => w * h
(Function)

kai> area(5, 10)
50

kai> area(3.5, 2.0)
7.0

kai> :clear
# Oops, need to keep the function!
```

## Troubleshooting

### "Undefined variable" Error

```kai
kai> print(x)
Error: x is not defined

kai> x := 42
42

kai> print(x)
42
```

### "Syntax Error"

```kai
kai> x :=
Error: Unexpected end of input

kai> x := 10
10
```

### REPL Won't Exit

Try these in order:
1. Type `:q` and press Enter
2. Press `Ctrl+C`
3. Press `Ctrl+D`

## Next Steps

Now that you know the REPL:

- [Variables & Types](/guide/basics/variables) - Learn about the type system
- [Functions](/guide/basics/functions) - Write reusable code
- [Arrays](/guide/collections/arrays) - Work with collections
- [Tutorials](/tutorials/learn-kai-with-tests) - Structured learning path

## Practice Exercises

1. **Calculator**: Use the REPL to calculate:
   - Area of a circle (πr²)
   - Compound interest
   - Fahrenheit to Celsius

2. **Data Analysis**:
   - Create an array of numbers
   - Calculate mean, median, mode
   - Filter outliers

3. **Function Writing**:
   - Write a function to convert temperatures
   - Create a function to calculate statistics
   - Build a data pipeline function

---

**Want to learn more?** Continue to [Variables & Types](/guide/basics/variables) or try the [Tutorials](/tutorials/learn-kai-with-tests).
