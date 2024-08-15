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
    expect(calculate('3+4*2/(4-1)')).toBe(5.6666666666);
  });
});