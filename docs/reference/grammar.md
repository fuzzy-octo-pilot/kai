# Grammar

Formal grammar for the Kai language.

## Lexical Grammar

### Keywords
None! Kai has no reserved keywords.

### Operators
```
:= = + - * / % < > <= >= == != && || ! |>
```

### Identifiers
```
[a-zA-Z_][a-zA-Z0-9_]*
```

### Literals
```
INTEGER: [0-9]+
FLOAT: [0-9]+.[0-9]+
STRING: ".*"
BOOLEAN: true | false
NULL: null
```

## Syntactic Grammar

### Program
```
Program → Statement*
```

### Statements
```
Statement → VarDecl
          | Assignment
          | IfStatement
          | WhileStatement
          | ForStatement
          | Expression
```

### Variable Declaration
```
VarDecl → IDENTIFIER ":=" Type? Expression
VarDecl → IDENTIFIER ":" Type ":=" Expression
```

### Assignment
```
Assignment → IDENTIFIER "=" Expression
```

### If Statement
```
IfStatement → "if" Expression Block ("else" ("if" Expression Block | Block))?
```

### While Loop
```
WhileStatement → "while" Expression Block
```

### For Loop
```
ForStatement → "for" IDENTIFIER "in" Range Block
ForStatement → "for" IDENTIFIER "in" Expression Block
```

### Expressions
```
Expression → BinaryOpExpression
```

### Binary Operations
```
BinaryOpExpression → LogicalOrExpression

LogicalOrExpression → LogicalAndExpression ("||" LogicalAndExpression)*
LogicalAndExpression → ComparisonExpression ("&&" ComparisonExpression)*
ComparisonExpression → AdditiveExpression (("<" | ">" | "<=" | ">=" | "==" | "!=") AdditiveExpression)*
AdditiveExpression → MultiplicativeExpression (("+" | "-") MultiplicativeExpression)*
MultiplicativeExpression → UnaryExpression (("*" | "/" | "%") UnaryExpression)*
```

### Unary
```
UnaryExpression → ("!" | "-") UnaryExpression
                 | PrimaryExpression
```

### Primary
```
PrimaryExpression → Literal
                   | IDENTIFIER
                   | ArrayLiteral
                   | RecordLiteral
                   | FunctionExpression
                   | CallExpression
                   | IndexExpression
                   | PipelineExpression
                   | "(" Expression ")"
```

### Function
```
FunctionExpression → Parameters "=>" Expression
                    | Parameters "=>" Block

Parameters → "(" ParamList? ")"
ParamList → Param ("," Param)*
Param → IDENTIFIER (":" Type)?
```

### Array
```
ArrayLiteral → "[" ExpressionList? "]"
ExpressionList → Expression ("," Expression)*
```

### Record
```
RecordLiteral → "{" FieldList? "}"
FieldList → Field ("," Field)*
Field → IDENTIFIER ":" Expression
```

### Pipeline
```
PipelineExpression → Expression "|>" Expression
```

### Types
```
Type → BasicType
     | ArrayType
     | FunctionType

BasicType → "int" | "float" | "string" | "bool"
ArrayType → BasicType "[]"
FunctionType → "(" ParamList? ")" "=>" Type
```

## See Also

- [Syntax Reference](/reference/syntax)
- [Type Reference](/reference/types)
