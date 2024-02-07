// watchCommand.js
const chokidar = require('chokidar');
const path = require('path');
const { isConfigFileExist, readConfigFile, logErrorAndExit } = require('../utils/utils');

function executeWatchCommand(argv) {
  if (!isConfigFileExist()) {
    logErrorAndExit('Config file does not exist or you are not in your root directory of themes. Please run configure command first.');
    return;
  }

  const config = readConfigFile();
  const { themeId, store, password } = getConfigAndArgs(config);


  if (config.ignore){
    config.ignore.push('config.yaml')
    ignoreFiles = config.ignore
  } else {
    ignoreFiles = ['config.yaml']
  }

  const watchOptions = {
    ignored: ignoreFiles,
    persistent: true
    // Add any other chokidar options you need
  };

  currentDir = path.basename(process.cwd())

  const watcher = chokidar.watch(process.cwd(), watchOptions);

  watcher.on('change', (filePath) => {
    console.log(`File ${path.relative(currentDir, filePath).slice(3)} has changed. Uploading content...`);
    // uploadContent(themeId, store, password);
  });

  watcher.on('add', (filePath) => {
    console.log(`File ${path.relative(currentDir, filePath).slice(3)} has been added. Uploading content...`);
    // uploadContent(themeId, store, password);
  });

  watcher.on('unlink', (filePath) => {
    console.log(`The file: ${path.relative(currentDir, filePath).slice(3)} has been removed....`);
    // uploadContent(themeId, store, password);
  });

  watcher.on('error', (error) => {
    console.error(`Watcher error: ${error}`);
  });

  console.log(`[*] Watching for changes...\nThis file: ${ignoreFiles.join(', ')} will be ignored`);
}

function getConfigAndArgs(config) {
  try {
    return {
      themeId: config.development.theme_id,
      store: config.development.store,
      password: config.development.password
    };
  } catch {
    logErrorAndExit("Looks like config file got corrupted")
  }
}

module.exports = executeWatchCommand;