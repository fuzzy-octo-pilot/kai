# Migrating from Python

Coming from Python? Here's how Kai compares.

## Key Differences

| Python | Kai |
|--------|-----|
| `def` | `=>` (arrow functions) |
| `lambda x: x*2` | `(x) => x*2` |
| `#` comments | `#` comments (same!) |
| `x = 42` | `x := 42` (declaration) |
| `x = 100` | `x = 100` (mutation) |

## Examples

### Functions

**Python:**
```python
def add(a, b):
    return a + b
```

**Kai:**
```kai
add := (a, b) => a + b
```

### List Comprehension

**Python:**
```python
doubled = [x * 2 for x in numbers]
```

**Kai:**
```kai
doubled := numbers.map(x => x * 2)
```

### Loops

**Python:**
```python
for i in range(10):
    print(i)
```

**Kai:**
```kai
for i in 0..10 {
  print(i)
}
```

## What's Different

1. **No `def` keyword** - Use arrow functions
2. **No classes** - Use records and functions
3. **Type annotations optional** - But recommended
4. **Pipeline operator** - `|>` for data pipelines

## What's Similar

1. **Clean syntax**
2. **Interactive REPL**
3. **Dynamic typing** (with optional static types)
4. **Array methods** similar to Python lists

## Migration Tips

1. Replace `def` with `=>`
2. Use `map`/`filter` instead of comprehensions
3. Use `|>` for data pipelines
4. Add types gradually

## Next Steps

- [Variables & Types](/guide/basics/variables)
- [Functions](/guide/basics/functions)
- [Tutorials](/tutorials/learn-kai-with-tests)
