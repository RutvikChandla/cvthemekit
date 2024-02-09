const { log } = require('console');
const http = require('http');

const requestListener = function (req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  log(path);

  if (path.startsWith('/getThemeList/')) {
    const store = path.substring('/getThemeList/'.length);
    const themes = getThemesForStore(store);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({themes}));
  } else if (path.startsWith('/store/')) {
    const [, , store, , themeID, action] = path.split('/');

    console.log(`Store: ${store}, Theme: ${themeID}, Action: ${action}`);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Logged: Store - ${store}, Theme - ${themeID}, Action - ${action}`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

function getThemesForStore(store) {
  const themeLists = {
    'store1': [{themeName: 'theme1', id: 5}],
  };

  return themeLists['store1'];
}

const server = http.createServer(requestListener);
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
