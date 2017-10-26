const { prettierFormat } = require('../utils/prettier');

const babelTemplate = (
  { presets } = {
    presets: `["env"]`
  }
) => {
  return `
  {
    "presets": ${presets}
  }
  `;
};

exports.default = babelTemplate;
