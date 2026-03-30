# Closures

Closures allow functions to capture variables from outer scope.

## Basic Closure

```kai
make_adder := (x) => {
  return (y) => x + y
}

add_5 := make_adder(5)
add_10 := make_adder(10)

print(add_5(3))   # 8
print(add_10(3))  # 13
```

## Capturing State

```kai
make_counter := () => {
  count := 0
  return () => {
    count = count + 1
    return count
  }
}

counter := make_counter()
print(counter())  # 1
print(counter())  # 2
print(counter())  # 3
```

## ML Example

```kai
make_scaler := (factor) => {
  return (values) => {
    return values.map(x => x * factor)
  }
}

scale_by_2 := make_scaler(2.0)
scale_by_10 := make_scaler(10.0)

print(scale_by_2([1, 2, 3]))   # [2, 4, 6]
print(scale_by_10([1, 2, 3]))  # [10, 20, 30]
```

## Use Cases

1. Function factories
2. Data transformation pipelines
3. Configuration generators
4. Private state

## Related

- [Functions](/guide/basics/functions)
- [Type System](/guide/advanced/type-system)
