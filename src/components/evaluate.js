const operations = require('../availableOperations.json');

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
        for (let operation of operations) {
          if (token === operation.symbol) {
            stack.push(eval(`${a}${operation.jsOperator}${b}`));
          }
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