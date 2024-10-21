const { tokenize, infixToPostfix, evaluatePostfix } = require('./components')

module.exports = function calculate(expression) {
  const tokens = tokenize(expression);
  const postfix = infixToPostfix(tokens);
  return evaluatePostfix(postfix);
}
