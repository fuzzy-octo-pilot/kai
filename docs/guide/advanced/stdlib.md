# Standard Library

Kai includes a rich standard library for ML/AI development.

## Math Functions

```kai
abs(-5)      # 5
sqrt(25)     # 5.0
pow(2, 8)    # 256.0
floor(3.7)   # 3
ceil(3.2)    # 4
round(3.5)   # 4
log(10)      # 2.302...
exp(1)       # 2.718...
min(5, 10)   # 5
max(5, 10)   # 10
rand()       # Random 0-1
randInt(1, 10)  # Random int 1-10
PI           # 3.14159...
E            # 2.718...
```

## Array Functions

```kai
[1,2,3].map(x => x*2)        # [2,4,6]
[1,2,3].filter(x => x>1)     # [2,3]
[1,2,3].reduce((a,b)=>a+b,0) # 6
len([1,2,3])                 # 3
[1,2,3].sum()                # 6
[1,2,3].mean()               # 2.0
[1,2,3].min()                # 1
[1,2,3].max()                # 3
[3,1,2].sort()               # [1,2,3]
[1,2,3].reverse()            # [3,2,1]
```

## Statistics (ML)

```kai
[1,2,3,4,5].stddev()         # 1.414...
[1,2,3,4,5].variance()       # 2.0
[1,2,3].normalize()         # [0.0, 0.5, 1.0]
dot([1,2], [3,4])            # 11.0
```

## String Functions

```kai
"hello".upper()              # "HELLO"
"HELLO".lower()              # "hello"
"  hi  ".trim()              # "hi"
"a,b,c".split(",")           # ["a","b","c"]
"hello".includes("ell")      # true
```

## I/O

```kai
print("Hello")               # Print with newline
print("x:", x)               # Multiple values
```

## Full Reference

See [Standard Library Reference](/reference/stdlib) for complete API.

## Next Steps

- [API Reference](/reference/stdlib) - Complete API docs
- [ML Features](/tutorials/chapters/07-ml) - Statistical functions
