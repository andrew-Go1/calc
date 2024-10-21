const operations = require('./availableOperations');

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
  if (isNaN(tokens[tokens.length - 1]) && tokens[tokens.length - 1] !== ')') {
    throw new Error('Некорректное выражение');
  }

  return tokens;
}

module.exports = {
  tokenize
}