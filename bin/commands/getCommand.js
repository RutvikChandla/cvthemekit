// getCommand.js
const { getConfigFilePath, readConfigFile, isConfigFileExist, logErrorAndExit, createConfigFile} = require('../utils/utils');
const { getThemeList, downloadTheme } = require('../utils/themeUtils');

function executeGetCommand(argv) {
  const { themeID, store, password } = getConfigAndArgs(argv);
  if (argv.list) {
    getThemeList(store, password);
  } else if (themeID) {
    downloadTheme(themeID, store, password);
  } else {
    console.error("Either --list or --themeID is required for 'get' command");
  }
}

function getConfigAndArgs(argv) {

/*

Verifying the presence of either the configuration file or command-line arguments, the command will proceed if either is provided. However, if both are provided and differ, the execution will be terminated to avoid conflicts.
*/

  const configExist = isConfigFileExist()
  if ( (configExist) || argv ){
    if ((configExist) && ("themeID" in argv && "store" in argv, "password" in argv)){
      const config = readConfigFile();
      const { themeID, store, password } = argv
      if (themeID == config.development.theme_id && store == config.development.store && password == config.development.password){
        return {
          themeID: argv.themeID,
          store: argv.store,
          password: argv.password
        };
      } else {
        logErrorAndExit('Values from the arg does not match config file we are stoping the process');
      }
    } else if (configExist) {
      const config = readConfigFile();
      try {
        return {
          themeID: config.development.theme_id,
          store: config.development.store,
          password: config.development.password
        };
      } catch {
        logErrorAndExit("Looks like config file got corrupted")
      }
    } else if ("themeID" in argv && "store" in argv, "password" in argv) {
      try {
        const { themeID, store, password } = argv
        createConfigFile(themeID, store, password)
        return {
        themeID: themeID,
        store: store,
        password: password
      };
      } catch (error){
        logErrorAndExit(error)
      }
    } else {
      logErrorAndExit("Config file and command line are not given")
    }
  } else {
    logErrorAndExit("Config file and command line are not given")
  }
}

module.exports = executeGetCommand;
