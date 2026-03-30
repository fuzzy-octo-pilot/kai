# Functions

Functions are reusable blocks of code in Kai.

## Arrow Functions

Kai uses arrow function syntax (similar to JavaScript):

```kai
add := (a, b) => a + b
```

## Function Syntax

### No Parameters

```kai
greet := () => "Hello, World!"
print(greet())  # "Hello, World!"
```

### Single Parameter

```kai
square := (n) => n * n
print(square(5))  # 25
```

### Multiple Parameters

```kai
add := (a, b) => a + b
print(add(10, 20))  # 30
```

### Typed Functions

```kai
add: (int, int) => int := (a, b) => a + b
```

## Function Bodies

### Single Expression

```kai
square := (n) => n * n
```

### Multi-Line (with return)

```kai
calculate := (x, y) => {
  temp := x * 2
  result := temp + y
  return result
}
```

## Closures

Functions can capture variables from outer scope:

```kai
make_multiplier := (factor) => {
  return (n) => n * factor
}

times_3 := make_multiplier(3)
times_10 := make_multiplier(10)

print(times_3(5))   # 15
print(times_10(5))  # 50
```

## Higher-Order Functions

Functions that take functions as parameters:

```kai
apply := (f, x) => f(x)

square := (n) => n * n
print(apply(square, 5))  # 25
```

## Examples

### Example 1: Array Functions

```kai
numbers := [1, 2, 3, 4, 5]

# Using built-in functions
doubled := numbers.map(x => x * 2)
# [2, 4, 6, 8, 10]

evens := numbers.filter(x => x % 2 == 0)
# [2, 4]

sum := numbers.reduce((a, b) => a + b, 0)
# 15
```

### Example 2: Utility Functions

```kai
# Temperature conversion
c_to_f := (c) => c * 9/5 + 32
print(c_to_f(0))   # 32.0
print(c_to_f(100)) # 212.0

# String utilities
greet := (name) => "Hello, " + name + "!"
print(greet("Kai"))  # "Hello, Kai!"
```

### Example 3: ML Functions

```kai
# Statistics
normalize := (values) => {
  mean := values.mean()
  std := values.stddev()
  return values.map(x => (x - mean) / std)
}

data := [1, 2, 3, 4, 5]
print(normalize(data))
```

## Best Practices

1. **Use arrow functions** for conciseness
2. **Type public APIs** for clarity
3. **Keep functions small** and focused
4. **Use meaningful names**

## Next Steps

- [Control Flow](/guide/basics/control-flow) - Conditionals and loops
- [Closures](/guide/advanced/closures) - Deep dive on closures
- [Type System](/guide/advanced/type-system) - Function types
