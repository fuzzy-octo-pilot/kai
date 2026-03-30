# Hello World

Let's write your first Kai program!

## Your First Program

Create a file called `hello.kai`:

```kai
# hello.kai
print("Hello, World!")
```

Run it:

```bash
node kai.js hello.kai
```

Output:

```
Hello, World!
```

Congratulations! You've written your first Kai program.

## A More Interesting Example

Let's try something more complex:

```kai
# A more interesting example
greeting := "Hello"
name := "Kai"

# String concatenation
message := greeting + ", " + name + "!"
print(message)

# Basic arithmetic
x := 10
y := 20
sum := x + y
print("Sum:", sum)

# Arrow function
square := (n) => n * n
print("Square of 5:", square(5))

# Array operations
numbers := [1, 2, 3, 4, 5]
doubled := numbers.map(x => x * 2)
print("Doubled:", doubled)

# Calculate statistics
avg := numbers.mean()
print("Average:", avg)
```

Output:

```
Hello, Kai!
Sum: 30
Square of 5: 25
Doubled: [2, 4, 6, 8, 10]
Average: 3.0
```

## Breakdown

Let's understand what's happening:

### Comments
```kai
# This is a comment
```
Comments start with `#` and continue to the end of the line.

### Variables
```kai
greeting := "Hello"
```
- `:=` is the **walrus operator** for declaring variables
- Variables are inferred to be strings

### String Concatenation
```kai
message := greeting + ", " + name + "!"
```
- Use `+` to concatenate strings
- Result: `"Hello, Kai!"`

### Arithmetic
```kai
sum := x + y
```
- Basic math: `+`, `-`, `*`, `/`, `%`
- Works with integers and floats

### Arrow Functions
```kai
square := (n) => n * n
```
- Arrow functions use `=>`
- Single parameter: `(n) => ...`
- Multiple parameters: `(a, b) => ...`

### Arrays
```kai
numbers := [1, 2, 3, 4, 5]
```
- Arrays are created with `[]`
- Can hold any type

### Array Methods
```kai
doubled := numbers.map(x => x * 2)
avg := numbers.mean()
```
- `.map()` - Transform each element
- `.mean()` - Calculate average
- More methods: `.filter()`, `.reduce()`, `.sum()`, etc.

## Try It Yourself

Modify the example to:

1. **Change the greeting**:
```kai
greeting := "Welcome"
# What happens?
```

2. **Add more operations**:
```kai
product := x * y
print("Product:", product)
```

3. **Use different array methods**:
```kai
evens := numbers.filter(x => x % 2 == 0)
print("Even numbers:", evens)
```

4. **Create your own function**:
```kai
greet := (name) => "Hello, " + name + "!"
print(greet("Kai"))
```

## Next Steps

Now that you've written your first program:

- [REPL Basics](/guide/repl-basics) - Interactive development
- [Variables & Types](/guide/basics/variables) - Learn about types
- [Functions](/guide/basics/functions) - Deep dive into functions
- [Control Flow](/guide/basics/control-flow) - Conditionals and loops

## Quick Reference

| Concept | Syntax | Example |
|---------|--------|---------|
| Comment | `#` | `# This is a comment` |
| Variable | `:=` | `x := 42` |
| String | `""` | `name := "Kai"` |
| Number | | `x := 3.14` |
| Array | `[]` | `[1, 2, 3]` |
| Function | `=>` | `f := (x) => x * 2` |
| Print | `print()` | `print("Hello")` |

---

**Ready for more?** Continue to [REPL Basics](/guide/repl-basics) or explore the [Language Guide](/guide/basics/variables).
