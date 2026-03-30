# Standard Library Reference

Complete reference for all built-in functions and types in Kai.

## Math Functions

### abs
Returns the absolute value of a number.

```kai
abs(-5)     # 5
abs(3.14)   # 3.14
```

**Type**: `(number) => number`

---

### sqrt
Returns the square root of a number.

```kai
sqrt(25)    # 5.0
sqrt(2)     # 1.414...
```

**Type**: `(number) => float`

---

### pow
Raises a number to a power.

```kai
pow(2, 8)   # 256.0
pow(10, 2)  # 100.0
```

**Type**: `(base: number, exponent: number) => float`

---

### floor
Rounds down to the nearest integer.

```kai
floor(3.7)  # 3
floor(-2.3) # -3
```

**Type**: `(number) => int`

---

### ceil
Rounds up to the nearest integer.

```kai
ceil(3.2)   # 4
ceil(-2.7)  # -2
```

**Type**: `(number) => int`

---

### round
Rounds to the nearest integer.

```kai
round(3.5)  # 4
round(3.4)  # 3
```

**Type**: `(number) => int`

---

### log
Returns the natural logarithm.

```kai
log(10)     # 2.302...
```

**Type**: `(number) => float`

---

### exp
Returns e raised to a power.

```kai
exp(1)      # 2.718...
exp(2)      # 7.389...
```

**Type**: `(number) => float`

---

### min
Returns the smaller of two numbers.

```kai
min(5, 10)  # 5
min(-1, 1)  # -1
```

**Type**: `(a: number, b: number) => number`

---

### max
Returns the larger of two numbers.

```kai
max(5, 10)  # 10
max(-1, 1)  # 1
```

**Type**: `(a: number, b: number) => number`

---

### rand
Returns a random float between 0 and 1.

```kai
rand()      # 0.723...
```

**Type**: `() => float`

---

### randInt
Returns a random integer in a range.

```kai
randInt(1, 10)  # Random int from 1 to 10
```

**Type**: `(min: int, max: int) => int`

---

### PI
The mathematical constant π.

```kai
PI          # 3.14159...
```

**Type**: `float`

---

### E
The mathematical constant e.

```kai
E           # 2.718...
```

**Type**: `float`

## Array Functions

### len
Returns the length of an array.

```kai
len([1, 2, 3])  # 3
```

**Type**: `(array) => int`

---

### range
Creates an array of integers in a range.

```kai
range(5)        # [0, 1, 2, 3, 4]
range(1, 5)     # [1, 2, 3, 4]
```

**Type**: `(end: int) => int[]` or `(start: int, end: int) => int[]`

---

### sum
Returns the sum of all elements.

```kai
[1, 2, 3, 4, 5].sum()    # 15
```

**Type**: `(number[]) => number`

---

### mean
Returns the average of all elements.

```kai
[1, 2, 3, 4, 5].mean()   # 3.0
```

**Type**: `(number[]) => float`

---

### min
Returns the minimum element.

```kai
[5, 2, 8, 1, 9].min()    # 1
```

**Type**: `(number[]) => number`

---

### max
Returns the maximum element.

```kai
[5, 2, 8, 1, 9].max()    # 9
```

**Type**: `(number[]) => number`

---

### map
Applies a function to each element.

```kai
[1, 2, 3].map(x => x * 2)    # [2, 4, 6]
```

**Type**: `(T[], (T) => U) => U[]`

---

### filter
Filters elements by a predicate.

```kai
[1, 2, 3, 4, 5].filter(x => x > 2)    # [3, 4, 5]
```

**Type**: `(T[], (T) => bool) => T[]`

---

### reduce
Reduces array to single value.

```kai
[1, 2, 3, 4].reduce((a, b) => a + b, 0)    # 10
```

**Type**: `(T[], (T, T) => T, T) => T`

---

### sort
Sorts the array.

```kai
[3, 1, 4, 1, 5].sort()    # [1, 1, 3, 4, 5]
```

**Type**: `(T[]) => T[]`

---

### reverse
Reverses the array.

```kai
[1, 2, 3].reverse()    # [3, 2, 1]
```

**Type**: `(T[]) => T[]`

---

### head
Returns the first element.

```kai
[1, 2, 3].head()    # 1
```

**Type**: `(T[]) => T`

---

### tail
Returns all elements except the first.

```kai
[1, 2, 3, 4].tail()    # [2, 3, 4]
```

**Type**: `(T[]) => T[]`

---

### zip
Combines multiple arrays.

```kai
zip([1, 2], [3, 4])    # [[1, 3], [2, 4]]
```

**Type**: `(T[], U[]) => [T, U][]`

---

### flatten
Flattens nested arrays.

```kai
[[1, 2], [3, 4]].flatten()    # [1, 2, 3, 4]
```

**Type**: `(T[][]) => T[]`

---

### unique
Returns unique elements.

```kai
[1, 2, 2, 3, 3, 3].unique()    # [1, 2, 3]
```

**Type**: `(T[]) => T[]`

---

### includes
Checks if element exists.

```kai
[1, 2, 3].includes(2)    # true
[1, 2, 3].includes(5)    # false
```

**Type**: `(T[], T) => bool`

## Statistical Functions

### std
Returns the standard deviation.

```kai
[1, 2, 3, 4, 5].std()    # 1.414...
```

**Type**: `(number[]) => float`

---

### variance
Returns the variance.

```kai
[1, 2, 3, 4, 5].variance()    # 2.0
```

**Type**: `(number[]) => float`

---

### normalize
Normalizes array to [0, 1].

```kai
[1, 2, 3].normalize()    # [0.0, 0.5, 1.0]
```

**Type**: `(number[]) => float[]`

---

### dot
Computes dot product of two arrays.

```kai
dot([1, 2, 3], [4, 5, 6])    # 32 (1*4 + 2*5 + 3*6)
```

**Type**: `(number[], number[]) => number`

## String Functions

### upper
Converts to uppercase.

```kai
"hello".upper()    # "HELLO"
```

**Type**: `(string) => string`

---

### lower
Converts to lowercase.

```kai
"HELLO".lower()    # "hello"
```

**Type**: `(string) => string`

---

### trim
Removes whitespace.

```kai
"  hello  ".trim()    # "hello"
```

**Type**: `(string) => string`

---

### split
Splits string by delimiter.

```kai
"a,b,c".split(",")    # ["a", "b", "c"]
```

**Type**: `(string, delimiter: string) => string[]`

---

### includes
Checks if substring exists.

```kai
"hello".includes("ell")    # true
"hello".includes("xyz")    # false
```

**Type**: `(string, substring: string) => bool`

## I/O Functions

### print
Prints values to stdout.

```kai
print("Hello, World!")
print("x:", x)
```

**Type**: `(...any) => void`

---

### println
Prints with newline.

```kai
println("Line 1")
println("Line 2")
```

**Type**: `(...any) => void`

## Pipeline Operator

### |>
Pipes values through functions.

```kai
data |> normalize |> mean
[1, 2, 3, 4, 5]
  |> filter(x => x > 2)
  |> map(x => x * 2)
  |> reduce((a, b) => a + b)
```

**Type**: `(T, (T) => U) => U`

## Type Conversions

### int
Converts to integer.

```kai
int(3.14)    # 3
int("42")    # 42
```

**Type**: `(any) => int`

---

### float
Converts to float.

```kai
float(42)    # 42.0
float("3.14")  # 3.14
```

**Type**: `(any) => float`

---

### str
Converts to string.

```kai
str(42)      # "42"
str(3.14)    # "3.14"
```

**Type**: `(any) => string`

## See Also

- [Type Reference](/reference/types)
- [Syntax Reference](/reference/syntax)
- [Grammar](/reference/grammar)

---

**Missing something?** Open an issue or PR on GitHub.
