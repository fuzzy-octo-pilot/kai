# Syntax Reference

Quick reference for Kai syntax.

## Comments

```kai
# Single-line comment
```

## Variables

```kai
# Declaration
x := 42

# With type
x: int := 42

# Mutation
x = 100
```

## Operators

### Arithmetic
```kai
+   # Addition
-   # Subtraction
*   # Multiplication
/   # Division
%   # Modulo
```

### Comparison
```kai
==  # Equal
!=  # Not equal
<   # Less than
>   # Greater than
<=  # Less or equal
>=  # Greater or equal
```

### Logical
```kai
&&  # AND
||  # OR
!   # NOT
```

### Pipeline
```kai
|>  # Pipeline operator
```

## Functions

```kai
# No params
greet := () => "Hello"

# Single param
square := (x) => x * x

# Multiple params
add := (a, b) => a + b

# Typed
add: (int, int) => int := (a, b) => a + b

# Multi-line
calculate := (x, y) => {
  temp := x * 2
  return temp + y
}
```

## Control Flow

### If/Else
```kai
if condition {
  # code
} else if other_condition {
  # code
} else {
  # code
}
```

### While
```kai
while condition {
  # code
}
```

### For
```kai
for i in 0..10 {
  # code
}

for item in array {
  # code
}
```

### Break/Continue
```kai
break
continue
```

## Arrays

```kai
# Literal
arr := [1, 2, 3]

# Access
arr[0]

# Methods
arr.map(x => x * 2)
arr.filter(x => x > 0)
arr.reduce((a, b) => a + b, 0)
arr.sum()
arr.mean()
```

## Records

```kai
# Literal
person := { name: "Alice", age: 25 }

# Access
person.name
person.age
```

## Strings

```kai
# Literal
text := "Hello"

# Concatenation
message := "Hello, " + name

# Methods
text.upper()
text.lower()
text.trim()
text.split(", ")
```

## Booleans

```kai
true
false
```

## Null

```kai
null
```

## See Also

- [Type Reference](/reference/types)
- [Standard Library](/reference/stdlib)
- [Grammar](/reference/grammar)
