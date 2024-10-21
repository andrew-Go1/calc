function evaluatePostfix(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else {
      if (token === '~') {
        const a = stack.pop();
        stack.push(-a);
      } else if (token === '+~') {
        const a = stack.pop();
        stack.push(a);
      } else {
        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case '+':
            stack.push(a + b);
            break;
          case '-':
            stack.push(a - b);
            break;
          case '*':
            stack.push(a * b);
            break;
          case '/':
            if (b === 0) throw new Error('Деление на ноль');
            stack.push(a / b);
            break;
        }
      }
    }
  }

  if (isNaN(stack[0])) { throw new Error("Некорректное выражение") }
  return stack[0];
}

module.exports = {
  evaluatePostfix
}