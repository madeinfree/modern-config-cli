const { prettierFormat } = require('../utils/prettier');

const webpackTemplate = (
  { entry, output, devtool, rules } = {
    entry: `./src/index.js`,
    output: `{
        filename: 'bundle.js',
        path: path.resolve('build')
      }`,
    devtool: `source-map`,
    rules: `{
        test: /\\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }`
  }
) => {
  return prettierFormat(`
    const path = require('path');

    module.exports = {
      entry: '${entry}',
      output: ${output},
      devtool: '${devtool}',
      module: {
        rules: [${rules}]
      }
    };
  `);
};

exports.default = webpackTemplate;
