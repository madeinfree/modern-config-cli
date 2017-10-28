#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const yargs = require('yargs');

const { typeOf, isString } = require('./utils/isTypes');
const { throwError } = require('./utils/logs');
const { createFolder } = require('./utils/fs');

const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .command('generate', 'Generate all config file.')
  .command('cra', 'Generate react application by create-react-app')
  .alias('o', 'out-dir')
  .nargs('o', 1)
  .describe('o', 'Specifies file folder.')
  .alias('f', 'file')
  .nargs('f', 1)
  .describe('f', 'Create specifies config file. [webpack, bable]')
  .example('config-cli generate', 'Create webpack and babel config.')
  .example('config-cli generate -f webpack', 'Create webpack.config.js config.')
  .help('h')
  .alias('h', 'help').argv;

const useCommand = argv._[0];
const useFilesOption = argv.file || argv.f;
const useOutdirOption = argv['out-dir'] || argv.o;

class ModernConfigCLI {
  constructor(options) {
    this.command = options.useCommand;
    this.files = options.useFilesOption || 'webpack,babel';
    this.outdir = options.useOutdirOption || './';
    this.config = {
      filepath: filename =>
        this.outdir
          ? path.resolve(this.outdir, filename)
          : path.resolve(filename)
    };
  }

  writeFilePromise(resolve, { filename, template }) {
    fs.writeFile(this.config.filepath(filename), template(), () => {
      resolve();
    });
  }

  webpackGeneratePromise() {
    return new Promise((resolve, reject) => {
      const webpackTemplate = require('./template/webpack.template').default;
      this.writeFilePromise(resolve, {
        filename: 'webpack.config.js',
        template: webpackTemplate
      });
    });
  }

  babelGeneratePromise() {
    return new Promise((resolve, reject) => {
      const babelTemplate = require('./template/babel.template').default;
      this.writeFilePromise(resolve, {
        filename: '.babelrc',
        template: babelTemplate
      });
    });
  }

  run() {
    if (this.command === 'generate') {
      this.files.split(',').forEach(file => {
        switch (file) {
          case 'webpack':
            return this.webpackGeneratePromise()
              .then(done => console.log('Generate webpack done'))
              .catch(err => console.log(err));
          case 'babel':
            return this.babelGeneratePromise()
              .then(done => console.log('Generate babel done'))
              .catch(err => console.log(err));
          default:
            throwError(`Specifies file only support 'webpack' and 'babel'`);
        }
      });
    }
    if (this.command === 'cra') {
      console.log('create-react-app running...');
    }
  }
}

const mc = new ModernConfigCLI({
  useCommand,
  useFilesOption,
  useOutdirOption
});

createFolder(mc.outdir).then(done => {
  if (done) console.log(`Create new folder ${mc.outdir}`);
  mc.run();
});
