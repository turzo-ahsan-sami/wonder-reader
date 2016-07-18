/* This is the .js file for all major functions.
		I'll try to keep track of all functions here,
		like a table of contents.

		- universal variables
		- limiter() :: to maintain limits of 25 - 200
		- Menu Items :: window menu functionality */

/* Zoom Limiter for the zoom function
		limiter() :: to maintain limits of 25 - 200 */
var viewWindow = document.getElementById('view-window');
var zoomLimit = document.getElementById('zoomlimit');
var viewHeight = parseInt(document.getElementById('view-window').style.height);
var viewWidth = parseInt(document.getElementById('view-window').style.width);
  // var vertMargin = parseInt(document.getElementById('view-window').style.marginTop)
function limiter() {
  var zoomValue = document.getElementById('zoomlimit').value;

  if (zoomValue >= 200) {
    document.getElementById('zoomlimit').value = 200;
  } else if (zoomValue < 25) {
    document.getElementById('zoomlimit').value = 25;
  } else {
    // do nothiing
  };
  var newHeight = document.getElementById('zoomlimit').value * 0.01 * viewHeight
  var newWidth = document.getElementById('zoomlimit').value * 0.01 * viewWidth
  document.getElementById('view-window').style.height = newHeight
  document.getElementById('view-window').style.marginTop = newHeight * -0.5 + 20
  document.getElementById('view-window').style.width = newWidth
  document.getElementById('view-window').style.marginLeft = newWidth * -0.5
};

/* Disables all a tags */
window.onload = function () {
  var anchors = document.getElementsByTagName("a");
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].onclick = function () {
      return (false)
    }
  }
}

/* Prototype value increaser */
var c = 0

function zoomAdder () {
  var zoomValue = parseInt(document.getElementById('zoomlimit').value)
  // console.log("++c + zoomValue is "++c + zoomValue);
  document.getElementById("zoomlimit").value = zoomValue + ++c;
};

/* Zoom Addition/Subtraction */
// function zoomAdder(e) {
// 	e.preventDefault();
// 	document.getElementById('zoomlimit').value = document.getElementById('zoomlimit').value + 1;
// };

/* Menu Item List */
var remote = require('remote')
var Menu = remote.require('menu')
var MenuItem = require('menu-item')
var template = [{
    label: 'File',
    submenu: [{
        label: 'Load',
        accelerator: 'CmdOrCtrl+O',
        role: 'load'
      },
      // Research  menu items  -->
      {
        label: 'Recent',
        role: '?'
      }, {
        label: 'Library',
        accelerator: 'CmdOrCtrl+L',
        role: '?'
      }, {
        type: 'separator'
      }, {
        label: 'Save As',
        accelerator: 'Shift+CmdOrCtrl+C',
        role: '?'
      }, {
        label: 'Refresh',
        accelerator: 'Shift+CmdOrCtrl+R',
        role: '?'
      }, {
        label: 'Properties',
        accelerator: 'Alt+Return',
        role: '?'
      }, {
        type: 'separator'
      }, {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+N',
        role: '?'
      }, {
        label: 'Close File',
        accelerator: 'CmdOrCtrl+W',
        role: '?'
      }, {
        label: 'Save and Close File',
        accelerator: 'Shift+CmdOrCtrl+Q',
        role: '?'
      }, {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        role: 'function() { app.quit(); }'
      }
    ]
  },
  // End Menu Items
  {
    label: 'Edit',
    submenu: [{
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    }, {
      label: 'Redo',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    }, {
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: 'Select All',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    }, ]
  }, {
    label: 'View',
    submenu: [{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: function(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.reload();
      }
    }, {
      label: 'Toggle Full Screen',
      accelerator: (function() {
        if (process.platform == 'darwin')
          return 'Ctrl+Command+F';
        else
          return 'F11';
      })(),
      click: function(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      }
    }, {
      label: 'Toggle Developer Tools',
      accelerator: (function() {
        if (process.platform == 'darwin')
          return 'Alt+Command+I';
        else
          return 'Ctrl+Shift+I';
      })(),
      click: function(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.toggleDevTools();
      }
    }, ]
  }, {
    label: 'Window',
    role: 'window',
    submenu: [{
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }, ]
  }, {
    label: 'Help',
    role: 'help',
    submenu: [{
      label: 'Learn More',
      click: function () {
        require('electron').shell.openExternal('http://electron.atom.io')
      }
    } ]
  }
];

if (process.platform == 'darwin') {
  var name = require('electron').app.getName();
  template.unshift({
    label: name,
    submenu: [{
      label: 'About ' + name,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: 'Hide ' + name,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: 'Hide Others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: 'Show All',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function() {
        app.quit();
      }
    }, ]
  });
  // Window menu.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  });
}

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
