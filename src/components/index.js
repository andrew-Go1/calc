const tokenize = require('./tokenizer');
const infixToPostfix = require('./toPostfix');
const evaluatePostfix = require('./evaluate');

module.exports = {
  ... tokenize,
  ... infixToPostfix,
  ... evaluatePostfix
}