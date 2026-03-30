# Arrays

Arrays are ordered collections of values in Kai.

## Creating Arrays

```kai
numbers := [1, 2, 3, 4, 5]
names := ["Alice", "Bob", "Charlie"]
mixed := [1, "two", 3.0, true]
empty := []
```

## Array Methods

### map()

Transform each element:

```kai
numbers := [1, 2, 3, 4, 5]
doubled := numbers.map(x => x * 2)
# [2, 4, 6, 8, 10]
```

### filter()

Keep elements that match a condition:

```kai
numbers := [1, 2, 3, 4, 5]
evens := numbers.filter(x => x % 2 == 0)
# [2, 4]
```

### reduce()

Reduce to a single value:

```kai
numbers := [1, 2, 3, 4, 5]
sum := numbers.reduce((a, b) => a + b, 0)
# 15
```

### sum() and mean()

```kai
numbers := [1, 2, 3, 4, 5]
total := numbers.sum()     # 15
average := numbers.mean()  # 3.0
```

### min() and max()

```kai
numbers := [5, 2, 8, 1, 9]
minimum := numbers.min()  # 1
maximum := numbers.max()  # 9
```

### sort() and reverse()

```kai
numbers := [3, 1, 4, 1, 5]
sorted := numbers.sort()      # [1, 1, 3, 4, 5]
reversed := numbers.reverse() # [5, 1, 4, 1, 3]
```

### head() and tail()

```kai
numbers := [1, 2, 3, 4, 5]
first := numbers.head()  # 1
rest := numbers.tail()   # [2, 3, 4, 5]
```

### length

```kai
numbers := [1, 2, 3, 4, 5]
count := len(numbers)  # 5
```

## Examples

### Example 1: Data Pipeline

```kai
data := [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

result := data
  .filter(x => x > 5)
  .map(x => x * 2)
  .reduce((a, b) => a + b, 0)

# 6+7+8+9+10 = 40, *2 = [12,14,16,18,20], sum = 80
```

### Example 2: Statistics

```kai
values := [23, 45, 67, 89, 12, 34, 56]

mean := values.mean()      # 46.57
minimum := values.min()    # 12
maximum := values.max()    # 89
stddev := values.stddev()  # 26.47
```

### Example 3: Data Processing

```kai
# Clean and normalize data
raw_data := [1, -2, 3, -4, 5, 0]

cleaned := raw_data
  .filter(x => x >= 0)      # Remove negatives
  .filter(x => x != 0)      # Remove zeros
  .map(x => x / 5.0)        # Normalize to 0-1

# [0.2, 0.6, 1.0]
```

## Array Operations

### Accessing Elements

```kai
numbers := [10, 20, 30, 40, 50]
first := numbers[0]  # 10
second := numbers[1] # 20
```

### Slicing (Planned)

```kai
# Coming in future versions
numbers := [1, 2, 3, 4, 5]
subset := numbers[1:3]  # [2, 3, 4]
```

## Best Practices

1. **Use map/filter/reduce** for transformations
2. **Chain methods** for data pipelines
3. **Use built-in methods** over loops
4. **Document complex transformations**

## Next Steps

- [Records](/guide/collections/records) - Struct-like data
- [Pipeline Operator](/guide/collections/pipeline) - Functional chaining
- [Functions](/guide/basics/functions) - Array function patterns
