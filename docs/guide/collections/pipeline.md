# Pipeline Operator

The pipeline operator (`|>`) allows elegant functional composition.

## Basic Usage

```kai
result := data |> transform |> process
```

## Examples

### Example 1: Data Processing

```kai
data := [1, 2, 3, 4, 5]

result := data
  |> filter(x => x > 2)
  |> map(x => x * 2)
  |> reduce((a, b) => a + b, 0)

# Step 1: [3, 4, 5]
# Step 2: [6, 8, 10]
# Step 3: 24
```

### Example 2: ML Pipeline

```kai
data := [1.0, 2.0, 3.0, 4.0, 5.0]

normalized := data
  |> normalize
  |> mean

# First normalize, then calculate mean
```

### Example 3: Text Processing

```kai
text := "Hello World"

words := text
  |> lower
  |> split(" ")
  |> filter(w => len(w) > 3)

# ["hello", "world"]
```

## Comparison: With vs Without Pipeline

### Without Pipeline
```kai
result := reduce(map(filter(data, x => x > 0), x => x * 2), (a, b) => a + b)
```

### With Pipeline
```kai
result := data
  |> filter(x => x > 0)
  |> map(x => x * 2)
  |> reduce((a, b) => a + b)
```

## Benefits

1. **Readability**: Left-to-right flow
2. **Composability**: Easy to add/remove steps
3. **Debugging**: Easy to inspect intermediate results

## Best Practices

1. Use for data transformation pipelines
2. Keep each step focused
3. Test pipeline stages separately

## Next Steps

- [Arrays](/guide/collections/arrays) - Array methods
- [Functions](/guide/basics/functions) - Function composition
- [ML Features](/tutorials/chapters/07-ml) - ML pipeline examples
