const fs = require('fs');
const yaml = require('js-yaml');


// utils.js


function getConfigFilePath() {
  return `${process.cwd()}/config.yml`;
}

function isConfigFileExist(){
  return fs.existsSync(`${process.cwd()}/config.yml`);
}

function isDirectoryEmpty(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  return files.length === 0;
}


function createConfigFile(themeID, store, password) {

  if (isConfigFileExist()) {
    logErrorAndExit("Config file already exist or you are not in your root of your theme folder")
  }

  const config = {
    development: {
      theme_id: themeID,
      store: store,
      password: password
    }
  };

  const yamlStr = yaml.dump(config);
  const configFile = getConfigFilePath();
  fs.writeFileSync(configFile, yamlStr, 'utf8');
}

function readConfigFile() {
  if (isConfigFileExist()){
    const configFile = getConfigFilePath();
    try {
      const configContents = fs.readFileSync(configFile, 'utf8');
      return yaml.load(configContents);
    } catch (error) {
      logErrorAndExit(error)
      return null;
    }
  } else {
    logErrorAndExit("Config file is missing or you are not in your root of your theme folder")
  }
}

function logErrorAndExit(message){
  console.error(`[X] ${message}`)
  process.exit(1);
}

module.exports = {
  getConfigFilePath,
  isConfigFileExist,
  createConfigFile,
  readConfigFile,
  logErrorAndExit
};