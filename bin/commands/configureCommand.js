// configureCommand.js
const { createConfigFile } = require('../utils/utils');

function executeConfigureCommand(argv) {
  const { themeID, store, password } = argv;

  if (!themeID || !store || !password) {
    console.error('Missing required arguments for configure command');
    return;
  }

  createConfigFile(themeID, store, password);
}

module.exports = executeConfigureCommand;
