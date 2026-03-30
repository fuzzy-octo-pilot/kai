# Mutation

Kai distinguishes between declaration and mutation.

## Declaration (`:=`)

Creates a new variable:

```kai
x := 42
```

## Mutation (`=`)

Changes an existing variable:

```kai
x = 100
```

## Why Two Operators?

```kai
# Prevents accidental overwriting
x := 42
# x := 100  # ERROR: Can't redeclare
x = 100     # OK: Clear mutation
```

## Examples

### Example 1: Counter

```kai
count := 0
count = count + 1  # Increment
count = count * 2  # Double
```

### Example 2: Update Elements

```kai
arr := [1, 2, 3]
arr[0] = 10  # Update first element
```

## Best Practices

1. Use `:=` for new variables
2. Use `=` for updates
3. Avoid unnecessary mutations

## Related

- [Variables & Types](/guide/basics/variables)
- [Records](/guide/collections/records)
