# Config CLI

Modern JavaScript Config Generator CLI, webpack, babel ...

## Installation

```
$ npm install modern-config-cli -g
```

## Uses

```
Usage: modern-config-cli.js <command> [options]

Command：
  modern-config-cli.js generate  Generate all config file.

Options：
  --version      Version                                                 [布林]
  -o, --out-dir  Specifies file folder.
  -f, --file     Create specifies config file. [webpack, bable]
  -h, --help     Help                                                 [布林]

Example：
  config-cli generate             Create webpack and babel config.
  config-cli generate -f webpack  Create webpack.config.js config.
```

## Generate Config file

### Create Webpack and Babel config

```
config-cli generate
```

### Create Specifies folder

```
config-cli generate --out-dir folder-path
```

### Create Specifies config

Now, only support webpack and babel

```command
config-cli generate -f webpack
config-cli generate -f babel
```

## License

MIT