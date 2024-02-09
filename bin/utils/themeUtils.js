const fs = require('fs');
const path = require('path');
const { logErrorAndExit } = require('./utils');


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

function updateContent(themeId, store, password, action, filePath) {
  const currentDir = path.basename(process.cwd())
  const key = path.relative(currentDir, filePath).slice(3)
  if (action !== "update" && action !== "delete") {
    console.error("Unsupported action. Only 'update' and 'delete' actions are supported.");
    return;
  }

  const url = `https://ag784pfw.c5.rs/${store}/${themeId}/${action}`;

  let body;
  if (action === "update") {
    let content = '';
    try {
      content = fs.readFileSync(filePath, { encoding: 'base64' });
    } catch (error) {
      console.error("Error reading file:", error);
      return;
    }
    body = JSON.stringify({ "action": action, "key": key, "content": content });
  } else { // action === "delete"
    body = JSON.stringify({ "action": action, "key": key });
  }

  try {
    const response = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`
      },
      body
    });

    if (response.ok) {
      console.log(`${action} operation successful.`);
    } else {
      console.error(`${action} operation failed. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error occurred while making the request:", error);
  }
}


module.exports = {
  getThemeList,
  downloadTheme,
  updateContent
};