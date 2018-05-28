const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// const clearCache = require('./modules/clearCache.js');

const path = require('path');
const isDev = require('electron-is-dev');

const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, height: 680,
    minWidth: 775, minHeight: 600,
    webPreferences: {
      webSecurity: false
    }});
  if(isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
    mainWindow.toggleDevTools();
  }
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', ()=> {
  createWindow();
});

app.on('before-quit', () => {
  console.log('clearing cache');
  // clearCache();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
