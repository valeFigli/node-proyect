const { sum } = require('./math.js');

const result = sum(5, 10);
console.log(`The sum of 5 and 10 is ${result}`);

// en math.js
const sum = (a, b) => a + b;
module.exports = { sum };