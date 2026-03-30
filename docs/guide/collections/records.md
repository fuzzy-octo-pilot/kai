# Records

Records are structured data types (similar to structs or objects).

## Creating Records

```kai
person := { name: "Alice", age: 25, city: "NYC" }
```

## Accessing Fields

```kai
person := { name: "Alice", age: 25 }

name := person.name     # "Alice"
age := person.age       # 25
```

## Updating Records

```kai
person := { name: "Alice", age: 25 }

# Mutation (changes existing record)
person.age = 26
```

## ML Configuration Example

```kai
config := {
  layers: [64, 32, 16],
  learning_rate: 0.001,
  epochs: 100,
  optimizer: "adam"
}

print(config.layers)        # [64, 32, 16]
print(config.learning_rate) # 0.001
```

## Nested Records

```kai
model := {
  architecture: {
    layers: [64, 32],
    activation: "relu"
  },
  training: {
    epochs: 100,
    batch_size: 32
  }
}
```

## Best Practices

1. Use records for related data
2. Use descriptive field names
3. Group related configuration

## Next Steps

- [Pipeline Operator](/guide/collections/pipeline) - Data transformation
- [Type System](/guide/advanced/type-system) - Typed records
