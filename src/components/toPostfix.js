const operations = require('./availableOperations');

function infixToPostfix(tokens) {
  const output = [];
  const operators = [];
  const precedence = {};
  operations.forEach(op => { precedence[op.symbol] = op.weight });
  precedence['~'] = 90; //   Приоритет для унарных операций должен быть
  precedence['+~'] = 90; //  выше всех других преобразований

  let bracketCount = 0;

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      output.push(token);
    } else if (token === '(') {
      operators.push(token);
      bracketCount++;
    } else if (token === ')') {
      if (bracketCount === 0) {
        throw new Error('Несоответствие скобок');
      }
      while (operators.length && operators[operators.length - 1] !== '(') {
        output.push(operators.pop());
      }
      operators.pop();
      bracketCount--;
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

  if (bracketCount !== 0) {
    throw new Error('Несоответствие скобок');
  }

  return output;
}

module.exports = {
  infixToPostfix
}