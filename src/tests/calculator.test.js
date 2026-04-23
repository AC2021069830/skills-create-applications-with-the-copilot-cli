const { add, sub, mul, div } = require('../calculator');

describe('calculator basic operations', () => {
  test('2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('10 - 4 = 6', () => {
    expect(sub(10, 4)).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(mul(45, 2)).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(div(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => div(1, 0)).toThrow('division by zero');
  });

  test('supports floats', () => {
    expect(div(5, 2)).toBeCloseTo(2.5);
  });

  test('negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
    expect(sub(-5, 2)).toBe(-7);
    expect(mul(-3, 3)).toBe(-9);
  });
});
