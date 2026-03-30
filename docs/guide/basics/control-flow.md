# Control Flow

Control flow structures in Kai.

## If/Else Statements

### Basic If

```kai
x := 10

if x > 5 {
  print("x is greater than 5")
}
```

### If/Else

```kai
x := 3

if x > 5 {
  print("x is greater than 5")
} else {
  print("x is 5 or less")
}
```

### If/Else If/Else

```kai
score := 85

if score >= 90 {
  print("A")
} else if score >= 80 {
  print("B")
} else if score >= 70 {
  print("C")
} else {
  print("F")
}
```

## Comparison Operators

```kai
a := 10
b := 20

a == b   # Equal
a != b   # Not equal
a < b    # Less than
a > b    # Greater than
a <= b   # Less than or equal
a >= b   # Greater than or equal
```

## Logical Operators

```kai
is_adult := true
has_ticket := true

# AND
if is_adult && has_ticket {
  print("Can enter")
}

# OR
if is_adult || has_parent {
  print("Can enter")
}

# NOT
if !is_adult {
  print("Cannot enter")
}
```

## While Loops

```kai
i := 0
while i < 5 {
  print(i)
  i = i + 1
}
# Output: 0 1 2 3 4
```

## For Loops

### Range Loop

```kai
for i in 0..10 {
  print(i)
}
# Output: 0 1 2 3 4 5 6 7 8 9 10
```

### Array Loop

```kai
names := ["Alice", "Bob", "Charlie"]
for name in names {
  print("Hello, " + name)
}
```

### With Index

```kai
numbers := [10, 20, 30]
for i in 0..len(numbers) - 1 {
  print(numbers[i])
}
```

## Break and Continue

### Break

Exit the loop early:

```kai
for i in 0..10 {
  if i == 5 {
    break
  }
  print(i)
}
# Output: 0 1 2 3 4
```

### Continue

Skip to next iteration:

```kai
for i in 0..10 {
  if i % 2 == 0 {
    continue
  }
  print(i)
}
# Output: 1 3 5 7 9
```

## Examples

### Example 1: Find Maximum

```kai
find_max := (numbers) => {
  if len(numbers) == 0 {
    return null
  }

  max := numbers[0]
  for num in numbers {
    if num > max {
      max = num
    }
  }
  return max
}

print(find_max([1, 5, 3, 9, 2]))  # 9
```

### Example 2: Filter Data

```kai
data := [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens := []

for num in data {
  if num % 2 == 0 {
    evens.append(num)  # Note: or use .filter()
  }
}
print(evens)  # [2, 4, 6, 8, 10]
```

### Example 3: FizzBuzz

```kai
for i in 1..100 {
  if i % 15 == 0 {
    print("FizzBuzz")
  } else if i % 3 == 0 {
    print("Fizz")
  } else if i % 5 == 0 {
    print("Buzz")
  } else {
    print(i)
  }
}
```

## Best Practices

1. **Use for loops** for iterations
2. **Use while loops** for unknown iterations
3. **Keep conditions simple**
4. **Use break/continue sparingly**

## Next Steps

- [Arrays](/guide/collections/arrays) - Work with collections
- [Functions](/guide/basics/functions) - Reusable code
- [Tutorials](/tutorials/learn-kai-with-tests) - Practice with tests
