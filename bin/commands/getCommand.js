// getCommand.js
const { getConfigFilePath, readConfigFile, isConfigFileExist, getThemeList, downloadTheme, logErrorAndExit, createConfigFile} = require('../utils/utils');

function executeGetCommand(argv) {
  const { themeId, store, password } = getConfigAndArgs(argv);
  if (argv.list) {
    getThemeList(store, password);
  } else if (themeId) {
    downloadTheme(themeId, store, password);
  } else {
    console.error("Either --list or --themeid is required for 'get' command");
  }
}

function getConfigAndArgs(argv) {

/*

Verifying the presence of either the configuration file or command-line arguments, the command will proceed if either is provided. However, if both are provided and differ, the execution will be terminated to avoid conflicts.
*/

  const configExist = isConfigFileExist()
  if ( (configExist) || argv ){
    if ((configExist) && ("themeid" in argv && "store" in argv, "password" in argv)){
      const config = readConfigFile();
      const { themeid, store, password } = argv
      if (themeid == config.development.theme_id && store == config.development.store && password == config.development.password){
        return {
          themeId: argv.themeid,
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
          themeId: config.development.theme_id,
          store: config.development.store,
          password: config.development.password
        };
      } catch {
        logErrorAndExit("Looks like config file got corrupted")
      }
    } else if ("themeid" in argv && "store" in argv, "password" in argv) {
      try {
        const { themeid, store, password } = argv
        createConfigFile(themeid, store, password)
        return {
        themeId: themeid,
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
