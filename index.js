const electron = require('electron');
const {app} = electron; // http://electron.atom.io/docs/v0.37.2/api/app/
const {BrowserWindow} = electron; //  http://electron.atom.io/docs/v0.37.2/api/browser-window/
// var cbr = require('cbr'); // https://www.npmjs.com/package/cbr
// var ebook = require('ebook-cover-generator'); // https://www.npmjs.com/package/ebook-cover-generator
// var node7z = require('node-7z'); // https://www.npmjs.com/package/node-7z
// var node7zEsf = require('node-7z-esf'); // https://www.npmjs.com/package/node-7z-esf
// var rarToZip = require('rar-to-zip'); // https://www.npmjs.com/package/rar-to-zip
var fs = require('fs'); // https://nodejs.org/api/fs.html
// var path = require('path'); // https://nodejs.org/api/path.html
// var JSZip = require('jszip'); // http://stuk.github.io/jszip/


let win // Global 'win' variable
function createWindow() {
  win = new BrowserWindow({
    width: 800,  // Window Size : width (duh)
    height: 600 // Window Size : height
  });
  win.loadURL(`file://${__dirname}/index.html`); // Points to the html file to load in the app ::
  // TODO: figure out why .loadURL doesn't work properly
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (win ===null) {
    createWindow();
  }
});
