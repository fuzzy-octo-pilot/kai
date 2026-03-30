# Migrating from JavaScript

Coming from JavaScript? Kai will feel familiar!

## Key Similarities

| JavaScript | Kai |
|------------|-----|
| `const x = 42` | `x := 42` |
| `x => x * 2` | `(x) => x * 2` |
| `.map()`, `.filter()` | Same! |
| `// comments` | `# comments` |

## Examples

### Arrow Functions

**JavaScript:**
```javascript
const add = (a, b) => a + b;
```

**Kai:**
```kai
add := (a, b) => a + b
```

### Array Methods

**JavaScript:**
```javascript
const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
```

**Kai:**
```kai
doubled := numbers.map(x => x * 2)
evens := numbers.filter(x => x % 2 == 0)
```

### Pipeline Operator

**JavaScript (proposal):**
```javascript
const result = data
  |> transform
  |> process;
```

**Kai (built-in):**
```kai
result := data
  |> transform
  |> process
```

## Key Differences

1. **No `var`/`let`/`const`** - Just `:=` for declaration
2. **No `this`** - Simpler model
3. **No classes** (yet) - Records and functions
4. **Python-style comments** - `#` instead of `//`
5. **ML built-ins** - Statistics, linear algebra

## What's Better in Kai

- **Pipeline operator** built-in
- **ML functions** built-in (mean, std, normalize)
- **Simpler model** - No prototypes, no `this`
- **Cleaner syntax** - No parentheses needed for if/while

## What You'll Miss

- **Huge ecosystem** (for now)
- **Browser** (until WASM target)
- **NPM packages** (planned)

## Migration Tips

1. Replace `const/let` with `:=`
2. Use `#` for comments
3. Remove semicolons
4. Use `==` instead of `===`
5. Try the pipeline operator!

## Next Steps

- [Variables & Types](/guide/basics/variables)
- [Functions](/guide/basics/functions)
- [Pipeline Operator](/guide/collections/pipeline)
