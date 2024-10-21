const calculate = require("../calculator.js");

describe('Calculator', () => {
  test('обработка сложения', () => {
    expect(calculate('2+3')).toBe(5);
  });

  test('обработка вычитания', () => {
    expect(calculate('5-3')).toBe(2);
  });

  test('обработка умноженя', () => {
    expect(calculate('4*3')).toBe(12);
  });

  test('обработка деления', () => {
    expect(calculate('10/2')).toBe(5);
  });

  test('обработка смешенной операции', () => {
    expect(calculate('2+3*4')).toBe(14);
  });

  test('обраотка выражения со скобками', () => {
    expect(calculate('(2+3)*4')).toBe(20);
  });

  test('обработка сложного приложения', () => {
    expect(calculate('3+4*2/(4-1)')).toBe(5.666666666666666);
  });

  test('обработка деления на ноль', () => {
    expect(() => calculate('10/0')).toThrow('Деление на ноль');
  });

  test('обработка унарного минуса', () => {
    expect(calculate('-3+2')).toBe(-1);
  });

  test('обработка унарного минуса в скобках', () => {
    expect(calculate('(-3+2)*4')).toBe(-4);
  });

  test('обработка унарного плюса', () => {
    expect(calculate('+3+2')).toBe(5);
  });

  test('обработка унарного плюса в скобках', () => {
    expect(calculate('(+3+2)*4')).toBe(20);
  });

  test('обработка некорректного выражения', () => {
    expect(() => calculate('2+*3')).toThrow('Некорректное выражение');
    expect(() => calculate('2+3+')).toThrow('Некорректное выражение');
  });
  
  test('обработка несоответствия скобок', () => {
    expect(() => calculate('(2+3)*4)')).toThrow('Несоответствие скобок');
    expect(() => calculate('((2+3)*4')).toThrow('Несоответствие скобок');
  });
});
