#!/usr/bin/env node
'use strict';

// Supported operations:
// - addition (add, +)
// - subtraction (sub, -)
// - multiplication (mul, *, x)
// - division (div, /)
// - modulo (mod, %)
// - power (pow, ^)
// - square (square, sqr)  -- unary operation

function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) {
  if (y === 0) throw new Error('division by zero');
  return x / y;
}
function mod(x, y) {
  if (y === 0) throw new Error('division by zero');
  return x % y;
}
function pow(x, y) { return Math.pow(x, y); }
function square(x) { return x * x; }

const operations = {
  add, '+': add,
  sub, '-': sub,
  mul, '*': mul, x: mul, X: mul,
  div, '/': div,
  mod, '%': mod,
  pow, '^': pow, power: pow,
  // square is unary; handled specially in CLI
  square, sqr: square
};

function usage() {
  console.log(`Usage: node src/calculator.js <operation> <operand1> [operand2]\n
Operations:
  add | +        : addition
  sub | -        : subtraction
  mul | * | x    : multiplication
  div | /        : division
  mod | %        : modulo (remainder)
  pow | ^        : power (x^y)
  square | sqr   : square a single operand (x * x)

Examples:
  node src/calculator.js add 2 3
  node src/calculator.js / 10 2
  node src/calculator.js pow 2 8
  node src/calculator.js square 4
`);
}

function cliMain(argv) {
  const [, , op, aRaw, bRaw] = argv;

  if (!op || !aRaw) {
    usage();
    process.exitCode = 1;
    return;
  }

  const a = Number(aRaw);
  const b = bRaw === undefined ? undefined : Number(bRaw);

  if (!Number.isFinite(a) || (bRaw !== undefined && !Number.isFinite(b))) {
    console.error('Error: operands must be valid numbers.');
    process.exitCode = 2;
    return;
  }

  // unary square
  if (op === 'square' || op === 'sqr') {
    try {
      console.log(square(a));
    } catch (err) {
      console.error('Error:', err.message);
      process.exitCode = 4;
    }
    return;
  }

  if (b === undefined) {
    console.error('Error: binary operation requires two operands.');
    usage();
    process.exitCode = 1;
    return;
  }

  const fn = operations[op];
  if (!fn) {
    console.error(`Error: unknown operation "${op}".`);
    usage();
    process.exitCode = 3;
    return;
  }

  try {
    const result = fn(a, b);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 4;
  }
}

if (require.main === module) {
  cliMain(process.argv);
}

module.exports = { add, sub, mul, div, mod, pow, square, operations };
