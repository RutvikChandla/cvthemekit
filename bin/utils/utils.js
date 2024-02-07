const fs = require('fs');
const yaml = require('js-yaml');
const axios = require('axios');


// utils.js
function getThemeList(store, password) {
  fetch(`http://localhost:3000/getThemeList/${store}`,{
    headers: {
      'Authorization': `Bearer ${password}`
    }})
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: Received status code ${response.status} and ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const themes = data.themes;
      themes.forEach(theme => {
        console.log(`Theme Name: ${theme.themeName}, ID: ${theme.id}`);
      });
    })
    .catch(error => {
      logErrorAndExit(error.message);
    });
}


function downloadTheme(themeId, store, password) {
  console.log('Download from:', store, "with password:", password, "for theme:", themeId)
}

module.exports = {
  getThemeList,
  downloadTheme
};

function getConfigFilePath() {
  return `${process.cwd()}/config.yml`;
}

function isConfigFileExist(){
  return fs.existsSync(`${process.cwd()}/config.yml`);
}

function createConfigFile(themeId, store, password) {
  if (isConfigFileExist()) {
    logErrorAndExit("Config file already exist or you are not in your root of your theme folder")
  }

  const config = {
    development: {
      theme_id: themeId,
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
  getThemeList,
  downloadTheme,
  getConfigFilePath,
  isConfigFileExist,
  createConfigFile,
  readConfigFile,
  logErrorAndExit
};