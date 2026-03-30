# Chapter 1: Variables & Types

Learn the fundamentals of variables and types in Kai.

## Introduction

Kai uses a simple, elegant approach to variables and types:

- **Walrus operator** (`:=`) for declaration
- **Optional type annotations** for safety
- **Type inference** for convenience
- **Mutation operator** (`=`) for reassignment

## Declaration

### Basic Declaration

Use the walrus operator (`:=`) to declare variables:

```kai
x := 42
print(x)  # Output: 42
```

The walrus operator (`:=`) is borrowed from Go and means "declare and assign".

### With Type Annotation

Add a type annotation for clarity and safety:

```kai
age: int := 25
name: string := "Kai"
pi: float := 3.14159
is_active: bool := true
```

### Type Inference

Kai can infer types from values:

```kai
x := 42        # Inferred: int
y := 3.14      # Inferred: float
z := "hello"   # Inferred: string
```

### Why Types?

Types provide:
- **Documentation**: Code is self-documenting
- **Safety**: Catch errors at compile time
- **Performance**: Enables future JIT optimizations

## Basic Types

### Integer

Whole numbers:

```kai
count := 42
negative := -10
hex := 0xFF
```

### Float

Decimal numbers:

```kai
pi := 3.14159
negative := -2.5
scientific := 1.5e10
```

### String

Text data:

```kai
name := "Kai"
greeting := "Hello, " + name
```

### Boolean

True/false values:

```kai
is_valid := true
is_empty := false
```

### Array

Collections of values:

```kai
numbers := [1, 2, 3, 4, 5]
names := ["Alice", "Bob", "Charlie"]
mixed := [1, "two", 3.0]
```

## Mutation

### Declaration (`:=`) vs Mutation (`=`)

- Use `:=` to **declare** a new variable
- Use `=` to **mutate** an existing variable

```kai
# Declaration
x := 42
print(x)  # 42

# Mutation
x = 100
print(x)  # 100

# Error: Can't redeclare
x := 200  # ERROR!
```

### Why Two Operators?

This design prevents accidental redeclaration:

```kai
# Without type checking (JavaScript)
x = 42
var x = 100  # Oops! Overwrote x

# With Kai's design
x := 42
x = 100      # Clear: we're mutating
# x := 200   # ERROR: can't redeclare
```

## Examples

### Example 1: Basic Arithmetic

```kai
# Declare variables
a := 10
b := 20

# Use them
sum := a + b
print("Sum:", sum)  # Output: Sum: 30

# Mutate
a = 100
sum = a + b
print("New sum:", sum)  # Output: New sum: 120
```

### Example 2: String Manipulation

```kai
# Declare strings
first_name := "Kai"
last_name := "Lang"

# Concatenate
full_name := first_name + " " + last_name
print(full_name)  # Output: Kai Lang

# Mutate
first_name = "Super"
full_name = first_name + " " + last_name
print(full_name)  # Output: Super Lang
```

### Example 3: Array Operations

```kai
# Declare array
numbers := [1, 2, 3, 4, 5]
print(numbers)  # Output: [1, 2, 3, 4, 5]

# Array methods
doubled := numbers.map(x => x * 2)
print(doubled)  # Output: [2, 4, 6, 8, 10]

# Statistics
avg := numbers.mean()
print("Average:", avg)  # Output: Average: 3.0
```

## Test Your Knowledge

Create a file `variables-test.kai`:

```kai
# Test 1: Declaration
x := 42
if x != 42 {
  print("FAIL: Expected 42, got", x)
} else {
  print("PASS: Test 1")
}

# Test 2: Type annotation
age: int := 25
if age != 25 {
  print("FAIL: Expected 25, got", age)
} else {
  print("PASS: Test 2")
}

# Test 3: Mutation
count := 0
count = 10
if count != 10 {
  print("FAIL: Expected 10, got", count)
} else {
  print("PASS: Test 3")
}

# Test 4: String concatenation
greeting := "Hello"
name := "Kai"
message := greeting + ", " + name + "!"
if message != "Hello, Kai!" {
  print("FAIL: Expected 'Hello, Kai!', got", message)
} else {
  print("PASS: Test 4")
}

# Test 5: Array operations
numbers := [1, 2, 3, 4, 5]
avg := numbers.mean()
if avg != 3.0 {
  print("FAIL: Expected 3.0, got", avg)
} else {
  print("PASS: Test 5")
}

print("\nAll tests completed!")
```

Run the test:

```bash
node kai.js variables-test.kai
```

Expected output:

```
PASS: Test 1
PASS: Test 2
PASS: Test 3
PASS: Test 4
PASS: Test 5

All tests completed!
```

## Challenges

### Challenge 1: Temperature Converter

Write a program that converts Celsius to Fahrenheit:

```kai
# Declare Celsius temperature
celsius: float := 25

# Calculate Fahrenheit (F = C * 9/5 + 32)
# Your code here

# Print result
print("Celsius:", celsius)
print("Fahrenheit:", fahrenheit)
```

<details>
<summary>Solution</summary>

```kai
celsius: float := 25
fahrenheit: float := celsius * 9.0 / 5.0 + 32.0
print("Celsius:", celsius)
print("Fahrenheit:", fahrenheit)
```

Expected output:
```
Celsius: 25
Fahrenheit: 77
```
</details>

### Challenge 2: Array Statistics

Given an array, calculate sum, mean, and check if mean > threshold:

```kai
# Array of numbers
data := [10, 20, 30, 40, 50]

# Calculate sum (use reduce or loop)
# Your code here

# Calculate mean
# Your code here

# Check if mean > threshold (25)
# Your code here

print("Sum:", sum)
print("Mean:", mean)
print("Mean > 25?", is_above_threshold)
```

<details>
<summary>Solution</summary>

```kai
data := [10, 20, 30, 40, 50]

# Using built-in methods
sum := data.reduce((a, b) => a + b, 0)
mean := data.mean()
is_above_threshold := mean > 25

print("Sum:", sum)
print("Mean:", mean)
print("Mean > 25?", is_above_threshold)
```

Expected output:
```
Sum: 150
Mean: 30.0
Mean > 25? true
```
</details>

## Common Mistakes

### Mistake 1: Redeclaration

```kai
x := 42
x := 100  # ERROR: Can't redeclare
```

**Fix**: Use mutation operator instead:

```kai
x := 42
x = 100  # OK
```

### Mistake 2: Type Mismatch

```kai
count: int := "hello"  # ERROR: Type mismatch
```

**Fix**: Match the type:

```kai
count: int := 42
message: string := "hello"
```

### Mistake 3: Using Undefined Variable

```kai
print(x)  # ERROR: x is not defined
```

**Fix**: Declare first:

```kai
x := 42
print(x)
```

## Summary

In this chapter, you learned:

- ✅ Declare variables with `:=`
- ✅ Add type annotations with `:` and `:=`
- ✅ Mutate variables with `=`
- ✅ Basic types: int, float, string, bool, array
- ✅ Type inference
- ✅ Why Kai has two operators

## Next Steps

- [Chapter 2: Functions](/tutorials/chapters/02-functions) - Learn about arrow functions and closures
- [Back to Tutorial Overview](/tutorials/learn-kai-with-tests)

## Practice Exercise

Create a simple calculator that:

1. Declares two numbers with type annotations
2. Performs addition, subtraction, multiplication, division
3. Prints all results with clear labels
4. Mutates one variable and recalculates

<details>
<summary>Example Solution</summary>

```kai
# Calculator with type annotations
a: float := 10.0
b: float := 5.0

# Operations
sum := a + b
diff := a - b
prod := a * b
quot := a / b

print("a =", a)
print("b =", b)
print("a + b =", sum)
print("a - b =", diff)
print("a * b =", prod)
print("a / b =", quot)

# Mutate and recalculate
a = 20.0
sum = a + b
print("\nAfter mutation:")
print("a =", a)
print("a + b =", sum)
```
</details>
