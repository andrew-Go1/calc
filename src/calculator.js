const operations = require('./availableOperations');

module.exports = function calculate(expression) {
  const tokens = tokenize(expression);
  const postfix = infixToPostfix(tokens);
  return evaluatePostfix(postfix);
}

function tokenize(expression) {
  const tokenSymbols = operations.map(op => `\\${op.symbol}`).join('|');
  const rex = new RegExp(`(\\d+(\\.\\d+)?|${tokenSymbols})`, "g");
  const tokens = expression.match(rex) || [];

  // Обработка унарных операций
  tokens.forEach((token, i, tokens) => {
    if (token === '-' && (i === 0 || isNaN(tokens[i - 1])) && tokens[i - 1] !== ')') {
      tokens[i] = '~'; // Спец токен для унарного "-"
    } else if (token === '+' && (i === 0 || isNaN(tokens[i - 1])) && tokens[i - 1] !== ')') {
      tokens[i] = '+~'; // Спец токен для унарного "+"
    }
  });

  return tokens;
}

function infixToPostfix(tokens) {
  const output = [];
  const operators = [];
  const precedence = {};
  operations.forEach(op => { precedence[op.symbol] = op.weight });
  precedence['~'] = 90; //   Приоритет для унарных операций должен быть
  precedence['+~'] = 90; //  выше всех других преобразований

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

  return stack[0];
}