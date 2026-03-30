# Variables & Types

Learn how to work with variables and types in Kai.

## Variable Declaration

### Basic Declaration

Use the walrus operator (`:=`) to declare variables:

```kai
x := 42
name := "Kai"
pi := 3.14
is_active := true
```

### With Type Annotations

Add type annotations for clarity and safety:

```kai
age: int := 25
name: string := "Kai"
pi: float := 3.14
is_active: bool := true
```

### Type Inference

Kai infers types from values:

```kai
x := 42        # Inferred: int
y := 3.14      # Inferred: float
z := "hello"   # Inferred: string
```

## Basic Types

### Integer

Whole numbers without decimal points:

```kai
count := 42
negative := -10
hex := 0xFF
large := 1000000
```

### Float

Numbers with decimal points:

```kai
pi := 3.14159
negative := -2.5
scientific := 1.5e10  # 15000000000.0
```

### String

Text enclosed in quotes:

```kai
name := "Kai"
greeting := "Hello, World!"
empty := ""
```

### Boolean

True or false values:

```kai
is_valid := true
is_empty := false
flag := true
```

### Array

Collections of values:

```kai
numbers := [1, 2, 3, 4, 5]
names := ["Alice", "Bob", "Charlie"]
mixed := [1, "two", 3.0, true]
```

### Null

Absence of a value:

```kai
nothing := null
```

## Declaration vs Mutation

### Declaration (`:=`)

Creates a new variable:

```kai
x := 42
# x is now 42
```

### Mutation (`=`)

Changes an existing variable:

```kai
x = 100
# x is now 100

# Error: Can't use := again
x := 200  # ERROR: Can't redeclare
```

### Why Two Operators?

This design prevents accidental redeclaration:

```kai
# Without type checking (some languages)
x = 42
var x = 100  # Oops! Overwrote x

# With Kai
x := 42
x = 100      # Clear: we're mutating
# x := 200   # ERROR: can't redeclare
```

## Type System

### Gradual Typing

Types are optional but powerful:

```kai
# Without types (flexible)
x := 42

# With types (safe and fast)
x: int := 42
```

### Type Checking

Kai validates type annotations:

```kai
# Correct
age: int := 25

# Type mismatch (warning)
age: int := "25"  # Warning: string != int
```

## Examples

### Example 1: Arithmetic

```kai
a := 10
b := 20

sum := a + b        # 30
diff := a - b       # -10
prod := a * b       # 200
quot := b / a       # 2
```

### Example 2: Strings

```kai
first := "Hello"
last := "World"

message := first + ", " + last + "!"
# "Hello, World!"
```

### Example 3: Arrays

```kai
numbers := [1, 2, 3, 4, 5]

# Array methods
doubled := numbers.map(x => x * 2)
sum := numbers.sum()
mean := numbers.mean()
```

### Example 4: Boolean Logic

```kai
is_adult := true
has_ticket := true

can_enter := is_adult && has_ticket  # true
is_free := !has_ticket               # false
```

### Example 5: Mixed Types

```kai
# Numbers
count: int := 42
price: float := 19.99

# Text
name: string := "Alice"
message: string := "Hello, " + name

# Boolean
is_active: bool := true
```

## Best Practices

### 1. Use Type Annotations for Public APIs

```kai
# Good
calculate_tax: (float) => float := (amount) => amount * 0.1

# Less clear
calculate_tax := (amount) => amount * 0.1
```

### 2. Let Inference Handle Simple Cases

```kai
# Good - type is obvious
count := 0

# Good - type is complex
data: float[] := [1.0, 2.0, 3.0]
```

### 3. Use Descriptive Names

```kai
# Good
user_age := 25
max_retries := 3

# Less clear
x := 25
n := 3
```

### 4. Declare Variables Close to Use

```kai
# Good
function process(data) {
  result := data.filter(x => x > 0)
  return result.map(x => x * 2)
}

# Less clear
result := null  # Declared too early
function process(data) {
  result := data.filter(x => x > 0)
  return result.map(x => x * 2)
}
```

## Common Mistakes

### Mistake 1: Redeclaration

```kai
x := 42
x := 100  # ERROR: Can't redeclare
```

**Fix**: Use mutation operator
```kai
x := 42
x = 100  # OK
```

### Mistake 2: Type Mismatch

```kai
count: int := "hello"  # ERROR
```

**Fix**: Match the type
```kai
count: int := 42
message: string := "hello"
```

### Mistake 3: Using Before Declaration

```kai
print(x)  # ERROR: x not defined
x := 42
```

**Fix**: Declare first
```kai
x := 42
print(x)
```

## Type Conversions

### String to Number

```kai
str := "42"
num := int(str)  # 42
```

### Number to String

```kai
num := 42
str := string(num)  # "42"
```

### Float to Int

```kai
pi := 3.14
truncated := int(pi)  # 3
```

## Next Steps

- [Functions](/guide/basics/functions) - Define reusable code
- [Control Flow](/guide/basics/control-flow) - Conditionals and loops
- [Arrays](/guide/collections/arrays) - Work with collections

## Practice

Create a program that:

1. Declares variables with different types
2. Uses both declaration and mutation
3. Performs type conversions
4. Demonstrates type inference

<details>
<summary>Solution</summary>

```kai
# Variables practice
name: string := "Kai"
age: int := 1
version: float := 0.4
is_stable: bool := false

# Mutation
age = 2
version = 0.5

# Type conversion
str_age := string(age)
num_version := float(str_age)

# Inference
x := 42  # int
y := 3.14  # float
z := "hello"  # string
```
</details>

---

**Ready to continue?** Learn about [Functions](/guide/basics/functions) or [Control Flow](/guide/basics/control-flow).
