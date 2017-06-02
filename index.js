const electron = require('electron'); // http://electron.atom.io/docs/
const app = electron.app; // http://electron.atom.io/docs/api/app/
const BrowserWindow = electron.BrowserWindow; // http://electron.atom.io/docs/api/browser-window/
const nativeImage = electron.nativeImage;

let win; // Global 'win' variable
function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 855,
    minHeight: 530,
    icon: './shieldIcon.png',
    title: 'Wonder Reader',
    show: false
  });
  win.loadURL(`file://${__dirname}/app/index.html`); // Points to the html file to load in the app
  win.maximize(); // Starts as maximized as you can get!
  win.once('ready-to-show', () => { win.show(); });
  win.on('closed', () => { win = null; });
}
const icon = nativeImage.createFromPath('./shieldIcon.png');
app.setName('Wonder Reader');
if (process.platform === 'darwin') { app.dock.setIcon(icon); }
app.on('ready', () => { createWindow(); });

app.on('window-all-closed', () => { app.quit(); });

app.on('activate', () => {
  if (win === null) { createWindow(); }
});
