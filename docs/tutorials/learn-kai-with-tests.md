# Learn Kai with Tests

Welcome to **Learn Kai with Tests** - a test-driven tutorial series inspired by [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests).

## Philosophy

The best way to learn a programming language is to **write tests**. Tests:

- ✅ Verify your understanding
- ✅ Document expected behavior
- ✅ Provide instant feedback
- ✅ Teach good practices

In this tutorial series, you'll learn Kai by writing tests for each concept.

## How This Tutorial Works

Each chapter follows this pattern:

1. **Introduction** - Learn a new concept
2. **Example** - See the concept in action
3. **Test** - Write a test to verify understanding
4. **Challenge** - Apply what you learned

## Prerequisites

- Kai installed (see [Installation](/guide/installation))
- Basic programming knowledge
- A text editor

## Running Tests

Each chapter has an associated test file. Run tests with:

```bash
node kai.js tests/tutorials/[chapter-name].kai
```

For example:

```bash
node kai.js tests/tutorials/01-variables.kai
```

## Tutorial Chapters

### Chapter 1: Variables & Types
**Learn the basics**: Declaration, types, and the walrus operator.

```kai
x := 42                    # Declaration
name: string := "Kai"      # With type
pi: float := 3.14          # Float type
```

[Read Chapter 1 →](/tutorials/chapters/01-variables)

---

### Chapter 2: Functions
**Arrow functions, parameters, and closures**.

```kai
add := (a, b) => a + b
square := (n: int) => n * n
```

[Read Chapter 2 →](/tutorials/chapters/02-functions)

---

### Chapter 3: Control Flow
**Conditionals, loops, and flow control**.

```kai
if x > 0 {
  print("positive")
}

for i in 0..10 {
  print(i)
}
```

[Read Chapter 3 →](/tutorials/chapters/03-control-flow)

---

### Chapter 4: Collections
**Arrays, records, and mutation**.

```kai
numbers := [1, 2, 3]
doubled := numbers.map(x => x * 2)

person := { name: "Kai", age: 1 }
```

[Read Chapter 4 →](/tutorials/chapters/04-collections)

---

### Chapter 5: Pipeline Operator
**Functional data transformation**.

```kai
data
  |> filter(x => x > 0)
  |> map(x => x * 2)
  |> reduce((a, b) => a + b)
```

[Read Chapter 5 →](/tutorials/chapters/05-pipelines)

---

### Chapter 6: Type System
**Gradual typing and type inference**.

```kai
x: int := 42
x := 42           # Equivalent

identity: (T) => T := (x) => x
```

[Read Chapter 6 →](/tutorials/chapters/06-types)

---

### Chapter 7: ML Features
**Statistics and linear algebra**.

```kai
values := [1, 2, 3, 4, 5]
avg := values.mean()       # 3.0
std := values.stddev()     # 2.236

result := dot_product(a, b)
```

[Read Chapter 7 →](/tutorials/chapters/07-ml)

---

## Learning Path

### For Complete Beginners
Start here if you're new to programming:

1. Variables & Types
2. Functions
3. Control Flow
4. Collections

### For Experienced Developers
Skip to advanced topics:

1. Pipeline Operator
2. Type System
3. ML Features

### For Data Scientists
Focus on ML-specific features:

1. Collections (especially arrays)
2. Pipeline Operator
3. ML Features
4. Type System (for performance)

## Tips for Success

### Run Every Test
Don't skip the tests! They're designed to reinforce learning.

### Experiment
Modify the examples and see what breaks. Understanding errors is part of learning.

### Take Your Time
Each chapter builds on the previous. Make sure you understand before moving on.

### Practice
Write your own code examples. The best way to learn is by doing.

## Common Patterns

### The Test Pattern

Every chapter follows this pattern:

```kai
# 1. Define the concept
concept := value

# 2. Test the concept
assert(concept == expected)

# 3. Use the concept
result := use(concept)
```

### The Assertion Pattern

Since Kai doesn't have a built-in `assert` yet, we use this pattern:

```kai
# Manual assertion
if result != expected {
  print("FAIL: Expected", expected, "got", result)
} else {
  print("PASS")
}
```

## What You'll Learn

By the end of this tutorial, you'll be able to:

- ✅ Write idiomatic Kai code
- ✅ Use the type system effectively
- ✅ Build data pipelines
- ✅ Perform statistical operations
- ✅ Write tests for your code
- ✅ Follow best practices

## Contributing

Found a bug? Want to add a chapter? See [Contributing Guide](/internals/contributing).

## Resources

- [Language Reference](/reference/stdlib)
- [API Documentation](/reference/syntax)
- [Community Examples](/community/examples)
- [FAQ](/community/faq)

---

**Ready to start?** Begin with [Chapter 1: Variables & Types](/tutorials/chapters/01-variables).
