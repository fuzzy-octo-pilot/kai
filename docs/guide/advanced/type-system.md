# Type System

Kai has a gradual type system with inference.

## Type Annotations

### Basic Types

```kai
age: int := 25
name: string := "Kai"
pi: float := 3.14
active: bool := true
```

### Array Types

```kai
numbers: int[] := [1, 2, 3]
matrix: float[][] := [[1.0, 2.0], [3.0, 4.0]]
```

### Function Types

```kai
# Untyped
add := (a, b) => a + b

# Typed
add: (int, int) => int := (a, b) => a + b
```

## Type Inference

Kai infers types from values:

```kai
x := 42        # Inferred as int
y := 3.14      # Inferred as float
z := "hello"   # Inferred as string
```

## Why Use Types?

1. **Safety**: Catch errors at compile time
2. **Documentation**: Self-documenting code
3. **Performance**: Enables JIT optimizations
4. **Tooling**: Better IDE support

## Examples

### Example 1: Typed Function

```kai
calculate_tax: (float) => float := (amount) => {
  return amount * 0.10
}
```

### Example 2: Generic Types (Planned)

```kai
identity: (T) => T := (x) => x
```

## Best Practices

1. Type public APIs
2. Use inference for local variables
3. Add types for complex data structures

## Next Steps

- [Functions](/guide/basics/functions) - Function types
- [Mutation](/guide/advanced/mutation) - Variable updates
- [Closures](/guide/advanced/closures) - Captured variables
