// watchCommand.js
const chokidar = require('chokidar');
const path = require('path');
const { isConfigFileExist, readConfigFile, logErrorAndExit } = require('../utils/utils');
const { updateContent } = require('../utils/themeUtils');


function executeWatchCommand(argv) {
  if (!isConfigFileExist()) {
    logErrorAndExit('Config file does not exist or you are not in your root directory of themes. Please run configure command first.');
    return;
  }

  const config = readConfigFile();


  if (config.ignore){
    config.ignore.push('config.yml')
    ignoreFiles = config.ignore
  } else {
    ignoreFiles = ['config.yml']
  }

  const absoluteIgnoreFiles = ignoreFiles.map(file => path.resolve(process.cwd(), file));

  const currentDir = path.basename(process.cwd())

  const watcher = chokidar.watch(process.cwd(), {
    ignored: absoluteIgnoreFiles,
    persistent: true,
    ignoreInitial: true   
    // Add any other chokidar options you need
  });

  watcher.on('change', (filePath) => {
    console.log(`File ${path.relative(currentDir, filePath).slice(3)} has been changed. Uploading content...`);
    const { themeId, store, password } = getConfigAndArgs(config);
    updateContent(themeId, store, password, "update", filePath);
  });

  watcher.on('add', (filePath) => {
    console.log(`File ${path.relative(currentDir, filePath).slice(3)} has been added. Uploading content...`);
    const { themeId, store, password } = getConfigAndArgs(config);
    updateContent(themeId, store, password, "update", filePath);
  });

  watcher.on('unlink', (filePath) => {
    console.log(`The file: ${path.relative(currentDir, filePath).slice(3)} has been removed....`);
    const { themeId, store, password } = getConfigAndArgs(config);
    updateContent(themeId, store, password, "delete", filePath);
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