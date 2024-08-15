const operations = require('./availableOperations');

module.exports = function calculate(expression) {
  const tokens = tokenize(expression);
  const postfix = infixToPostfix(tokens);
  return evaluatePostfix(postfix);
}

function tokenize(expression) {
  return expression.match(/(\d+\.?\d*|\+|\-|\*|\/|\^|\(|\))/g) || [];
}

function infixToPostfix(tokens) {
  const output = [];
  const operators = [];
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2};

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      output.push(token);
    } else if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators.length && operators[operators.length - 1] !== '(') {
        output.push(operators.pop());
      }
      operators.pop();
    } else {
      while (
        operators.length &&
        operators[operators.length - 1] !== '(' &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    }
  }

  while (operators.length) {
    output.push(operators.pop());
  }

  return output;
}

function evaluatePostfix(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
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
          stack.push(a / b);
          break;
      }
    }
  }

  return stack[0];
}