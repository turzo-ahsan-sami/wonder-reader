var app = require('app'); // http://electron.atom.io/docs/v0.37.2/api/app/
var BrowserWindow = require('browser-window'); //  http://electron.atom.io/docs/v0.37.2/api/browser-window/
var cbr = require('cbr'); // https://www.npmjs.com/package/cbr
var ebook = require('ebook-cover-generator'); // https://www.npmjs.com/package/ebook-cover-generator
var node7z = require('node-7z'); // https://www.npmjs.com/package/node-7z
var node7zEsf = require('node-7z-esf'); // https://www.npmjs.com/package/node-7z-esf
var rarToZip = require('rar-to-zip'); // https://www.npmjs.com/package/rar-to-zip
var fs = require('fs'); // https://nodejs.org/api/fs.html
var path = require('path'); // https://nodejs.org/api/path.html
var JSZip = require('jszip'); // http://stuk.github.io/jszip/

app.on('ready', function() {
	var mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});
