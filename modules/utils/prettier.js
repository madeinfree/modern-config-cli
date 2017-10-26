const prettier = require('prettier');

const prettierFormat = str => prettier.format(str);

module.exports = { prettierFormat };
