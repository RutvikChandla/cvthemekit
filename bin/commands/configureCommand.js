// configureCommand.js
const { createConfigFile } = require('../utils/utils');

function executeConfigureCommand(argv) {
  const { themeid, store, password } = argv;

  if (!themeid || !store || !password) {
    console.error('Missing required arguments for configure command');
    return;
  }

  createConfigFile(themeid, store, password);
}

module.exports = executeConfigureCommand;
