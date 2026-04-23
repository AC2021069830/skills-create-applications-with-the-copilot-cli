#!/usr/bin/env node
'use strict';

// Supported operations:
// - addition (add, +)
// - subtraction (sub, -)
// - multiplication (mul, *, x)
// - division (div, /)

const [, , op, aRaw, bRaw] = process.argv;

function usage() {
  console.log(`Usage: node src/calculator.js <operation> <operand1> <operand2>\n
Operations:
  add | +    : addition
  sub | -    : subtraction
  mul | * | x: multiplication
  div | /    : division

Examples:
  node src/calculator.js add 2 3
  node src/calculator.js / 10 2
`);
}

if (!op || !aRaw || !bRaw) {
  usage();
  process.exitCode = 1;
  return;
}

const a = Number(aRaw);
const b = Number(bRaw);

if (!Number.isFinite(a) || !Number.isFinite(b)) {
  console.error('Error: both operands must be valid numbers.');
  process.exitCode = 2;
  return;
}

const operations = {
  add: (x, y) => x + y,
  '+': (x, y) => x + y,
  sub: (x, y) => x - y,
  '-': (x, y) => x - y,
  mul: (x, y) => x * y,
  '*': (x, y) => x * y,
  x: (x, y) => x * y,
  X: (x, y) => x * y,
  div: (x, y) => {
    if (y === 0) throw new Error('division by zero');
    return x / y;
  },
  '/': (x, y) => {
    if (y === 0) throw new Error('division by zero');
    return x / y;
  },
};

const fn = operations[op];
if (!fn) {
  console.error(`Error: unknown operation "${op}".`);
  usage();
  process.exitCode = 3;
  return;
}

try {
  const result = fn(a, b);
  // Print integer if result is integer, otherwise print as-is
  if (Number.isInteger(result)) console.log(result);
  else console.log(result);
} catch (err) {
  console.error('Error:', err.message);
  process.exitCode = 4;
}
