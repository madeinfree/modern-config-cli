# Config CLI

Modern JavaScript Config Generator CLI, webpack, babel ...

## Installation

```
$ npm install modern-config-cli -g
```

## Uses

```
Command：
  config-cli generate  Generate all config file.

Options：
  --version   Version
  -f, --file  Create specifies config file. [webpack, bable]
  -h, --help  Help
```

## Generate Config file

### Create Webpack and Babel config

```
config-cli generate
```

### Create Specifies config

Now, only support webpack and babel

```command
config-cli generate -f webpack
config-cli generate -f babel
```

## License

MIT