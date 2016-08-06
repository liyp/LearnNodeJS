var utils = require('./utils');

utils.hello();

// module `utils` only run once when load 
console.log(utils.count());
console.log(utils.count());
console.log(utils.count());
