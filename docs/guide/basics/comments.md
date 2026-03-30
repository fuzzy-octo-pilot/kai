# Comments

Comments explain your code and are ignored by the interpreter.

## Single-Line Comments

Use `#` for single-line comments:

```kai
# This is a comment
x := 42  # This explains the code

# Calculate the square
square := (n) => n * n
```

## Inline Comments

Comments can be at the end of a line:

```kai
age := 25  # User's age
name := "Kai"  # Language name
```

## Best Practices

### 1. Comment Why, Not What

```kai
# Bad: Tells what
x := x + 1  # Increment x

# Good: Explains why
x := x + 1  # Move to next iteration
```

### 2. Use Comments for Complex Logic

```kai
# Calculate standard deviation using the formula:
# sqrt(mean((x - mean)^2))
stddev := (values) => {
  mean := values.mean()
  squared_diffs := values.map(x => (x - mean) * (x - mean))
  return sqrt(squared_diffs.mean())
}
```

### 3. Document Function Intent

```kai
# Normalize values to zero mean and unit variance
# Used for ML feature scaling
normalize := (values) => {
  # Implementation...
}
```

### 4. TODO Comments

```kai
# TODO: Add support for nested arrays
# FIXME: This is slow for large datasets
# NOTE: Requires Kai v0.5.0 or later
```

## When to Comment

✅ **Do comment:**
- Complex algorithms
- Non-obvious logic
- Workarounds
- Design decisions
- Public API documentation

❌ **Don't comment:**
- Obvious code
- Redundant information
- Outdated comments
- Commented-out code (delete it instead)

## Example

```kai
# Calculate Fibonacci sequence
# Uses dynamic programming for O(n) performance
fib := (n) => {
  if n <= 1 {
    return n
  }

  a := 0
  b := 1

  for i in 2..n {
    # Calculate next Fibonacci number
    temp := a + b
    a = b
    b = temp
  }

  return b
}
```

## Next Steps

- [Variables & Types](/guide/basics/variables) - Data types
- [Functions](/guide/basics/functions) - Reusable code
- [Control Flow](/guide/basics/control-flow) - Loops and conditionals
