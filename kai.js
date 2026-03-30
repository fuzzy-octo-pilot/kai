#!/usr/bin/env node

/**
 * Kai - Entry Point
 * REPL and File Runner for the Kai programming language
 */

const fs = require('fs');
const readline = require('readline');
const { Lexer } = require('./src/lexer');
const Parser = require('./src/parser');
const { Interpreter } = require('./src/interpreter');
const { TypeChecker } = require('./src/typechecker');
const { Compiler } = require('./src/compiler');
const { VM } = require('./src/vm');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Run a .kai file
 */
function runFile(filename, useVM = false) {
  try {
    const source = fs.readFileSync(filename, 'utf-8');
    const result = execute(source, true, useVM);

    if (result !== undefined) {
      console.log(colors.cyan + 'Result:' + colors.reset, result);
    }
  } catch (error) {
    console.error(colors.red + 'Error:' + colors.reset, error.message);
    process.exit(1);
  }
}

/**
 * Execute source code
 * @param {string} source - Source code
 * @param {boolean} typeCheck - Whether to type check
 * @param {boolean} useVM - Whether to use VM instead of interpreter
 */
function execute(source, typeCheck = true, useVM = false) {
  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();
  const parser = new Parser(tokens);
  const ast = parser.parse();

  // Type check (gradual - warn mode)
  if (typeCheck) {
    const typeChecker = new TypeChecker();
    const errors = typeChecker.check(ast);

    if (errors.length > 0) {
      // Print type errors in yellow (warnings)
      errors.forEach(err => {
        console.log(colors.yellow + err.toString() + colors.reset);
      });
      // Continue execution anyway (gradual typing)
    }
  }

  // Choose execution engine
  if (useVM) {
    // Use bytecode VM (Phase 5.1+)
    try {
      const compiler = new Compiler();
      const chunk = compiler.compile(ast);
      const vm = new VM();
      return vm.interpret(chunk);
    } catch (e) {
      // Fallback to interpreter on error
      console.log(colors.yellow + 'VM Error, falling back to interpreter:' + colors.reset, e.message);
      const interpreter = new Interpreter();
      return interpreter.run(ast);
    }
  } else {
    // Use tree-walking interpreter
    const interpreter = new Interpreter();
    return interpreter.run(ast);
  }
}

/**
 * REPL - Read-Eval-Print Loop
 */
function runRepl() {
  console.log(colors.blue + 'Kai v0.1 - The Ocean of ML/AI' + colors.reset);
  console.log(colors.cyan + 'Type :help for help, :q to quit' + colors.reset);
  console.log();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: colors.green + 'kai> ' + colors.reset,
  });

  const interpreter = new Interpreter();

  // Track current environment for REPL persistence
  let env = interpreter.globals;

  rl.prompt();

  rl.on('line', (line) => {
    const trimmed = line.trim();

    // Handle REPL commands
    if (trimmed === ':q' || trimmed === ':quit') {
      console.log(colors.cyan + 'Goodbye!' + colors.reset);
      rl.close();
      return;
    }

    if (trimmed === ':help') {
      showHelp();
      rl.prompt();
      return;
    }

    if (trimmed === ':env') {
      showEnv(env);
      rl.prompt();
      return;
    }

    if (trimmed === ':clear') {
      console.clear();
      rl.prompt();
      return;
    }

    // Skip empty lines
    if (!trimmed) {
      rl.prompt();
      return;
    }

    // Execute code
    try {
      const lexer = new Lexer(line);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
      const ast = parser.parse();

      // Create a child environment for this statement
      const stmtEnv = env.child();
      const result = interpreter.eval(ast, stmtEnv);

      // Merge new definitions back into main environment
      Object.assign(env.vars, stmtEnv.vars);

      if (result !== undefined) {
        console.log(colors.cyan + '=>' + colors.reset, formatResult(result));
      }
    } catch (error) {
      console.error(colors.red + 'Error:' + colors.reset, error.message);
    }

    rl.prompt();
  });

  rl.on('close', () => {
    process.exit(0);
  });
}

/**
 * Show help message
 */
function showHelp() {
  console.log(colors.cyan + '\nREPL Commands:' + colors.reset);
  console.log('  :help   - Show this help message');
  console.log('  :env    - Show current environment (variables)');
  console.log('  :clear  - Clear the screen');
  console.log('  :q      - Quit the REPL');
  console.log(colors.cyan + '\nLanguage Features:' + colors.reset);
  console.log('  Variables:   x := 42');
  console.log('  Types:       x: float := 3.14');
  console.log('  Functions:   f := (a, b) => a + b');
  console.log('  Arrays:      [1, 2, 3]');
  console.log('  Pipeline:    data |> normalize |> mean');
  console.log();
}

/**
 * Show current environment
 */
function showEnv(env) {
  console.log(colors.cyan + '\nEnvironment:' + colors.reset);
  const vars = Object.keys(env.vars);
  if (vars.length === 0) {
    console.log('  (empty)');
  } else {
    vars.forEach(name => {
      const value = env.vars[name];
      const valueStr = formatResult(value);
      console.log(`  ${name} = ${valueStr}`);
    });
  }
  console.log();
}

/**
 * Format result for display
 */
function formatResult(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'function') return '[function]';
  if (Array.isArray(value)) {
    if (value.length > 10) {
      return `[${value.slice(0, 10).join(', ')}, ...] (${value.length} items)`;
    }
    return `[${value.join(', ')}]`;
  }
  if (typeof value === 'string') return `"${value}"`;
  return String(value);
}

/**
 * Main entry point
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // No arguments - run REPL
    runRepl();
  } else {
    // Parse flags
    let useVM = false;
    let filename = null;

    for (const arg of args) {
      if (arg === '--vm' || arg === '-v') {
        useVM = true;
      } else if (arg === '--help' || arg === '-h') {
        console.log('Kai Programming Language v0.5.0-dev');
        console.log('\nUsage:');
        console.log('  kai                  - Start REPL');
        console.log('  kai <file.kai>       - Run a .kai file (interpreter)');
        console.log('  kai --vm <file.kai>   - Run with bytecode VM');
        console.log('  kai --help           - Show this help');
        process.exit(0);
      } else {
        filename = arg;
      }
    }

    if (filename) {
      runFile(filename, useVM);
    } else {
      console.error(colors.red + 'Error:' + colors.reset + ' No file specified');
      console.log('Usage: kai [--vm] <file.kai>');
      process.exit(1);
    }
  }
}


// Run main
main();
