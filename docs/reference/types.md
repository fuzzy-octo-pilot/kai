# Type Reference

Complete reference for all types in Kai.

## Primitive Types

### int
Whole numbers:
```kai
x: int := 42
```

### float
Decimal numbers:
```kai
x: float := 3.14
```

### string
Text:
```kai
name: string := "Kai"
```

### bool
Boolean:
```kai
flag: bool := true
```

### null
Null value:
```kai
nothing := null
```

## Collection Types

### Array
Homogeneous array:
```kai
numbers: int[] := [1, 2, 3]
matrix: float[][] := [[1.0, 2.0], [3.0, 4.0]]
```

### Record
Structured data:
```kai
person: {name: string, age: int} := {name: "Alice", age: 25}
```

## Function Types

### Basic Function
```kai
add: (int, int) => int := (a, b) => a + b
```

### No Parameters
```kai
greet: () => string := () => "Hello"
```

### Multiple Return Types (Planned)
```kai
parse: (string) => (int, error)
```

## Generic Types (Planned)

```kai
identity: (T) => T := (x) => x
first: (T[]) => T := (arr) => arr[0]
```

## Type Inference

Kai infers types:

```kai
x := 42          # int
y := 3.14        # float
z := "hello"     # string
```

## Type Conversion

```kai
int("42")        # String to int
string(42)       # Int to string
float(42)        # Int to float
```

## See Also

- [Standard Library](/reference/stdlib)
- [Syntax Reference](/reference/syntax)
