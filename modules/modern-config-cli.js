#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const yargs = require('yargs');

const { typeOf, isString } = require('./utils/isTypes');
const { throwError } = require('./utils/logs');

const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .command('generate', 'Generate all config file.')
  .alias('f', 'file')
  .nargs('f', 1)
  .describe('f', 'Create specifies config file. [webpack, bable]')
  .help('h')
  .alias('h', 'help').argv;

const defaultConfig = {
  filepath: filename => path.resolve(filename)
};
const isGenerate = argv._[0] === 'generate';
const useFileOptions = argv.file || argv.f;

const webpackGeneratePromise = options => {
  return new Promise((resolve, reject) => {
    const webpackTemplate = require('./template/webpack.template').default;
    fs.writeFile(
      defaultConfig.filepath('webpack.config.js'),
      webpackTemplate(),
      () => {
        resolve();
      }
    );
  });
};

const babelGeneratePromise = options => {
  return new Promise((resolve, reject) => {
    const webpackTemplate = require('./template/babel.template').default;
    fs.writeFile(defaultConfig.filepath('.babelrc'), webpackTemplate(), () => {
      resolve();
    });
  });
};

if (isGenerate) {
  if (useFileOptions) {
    if (!isString(useFileOptions))
      throwError(
        `Specifies file name expect string but got ${typeOf(
          useFileOptions
        )}: ${useFileOptions}`
      );
    switch (useFileOptions) {
      case 'webpack':
        return webpackGeneratePromise()
          .then(done => console.log('Generate webpack done'))
          .catch(err => console.log(err));
      case 'babel':
        return babelGeneratePromise()
          .then(done => console.log('Generate babel done'))
          .catch(err => console.log(err));
      default:
        throwError(`Specifies file only support 'webpack' and 'babel'`);
    }
  } else {
    Promise.all([webpackGeneratePromise(), babelGeneratePromise()])
      .then(done => console.log('Generate done.'))
      .catch(err => {
        console.log(err);
      });
  }
}
