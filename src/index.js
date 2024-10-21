const calculator = require('./calculator');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Введите выражение: ", expression => {
  console.log("Результат:", calculator(expression));
  rl.close();
});
