var colors = require('colors');
var mkdirp = require('mkdirp');
var packager = require('electron-packager');

var platform = process.platform;
mkdirp.sync('./build');
console.log(colors.red('Compiling Wonder Reader.  This may take a few minutes.'))
packager(
  {
    dir: './',
    name: 'Wonder Reader',
    platform: platform,
    arch: 'x64',
    prune: true,
    out: './build',
    icon: './shieldIcon'
  },
  function cb(err, appPaths) {
    postPackage(appPaths);
  }
);

function postPackage(appPaths) {
  console.log(colors.magenta('Wonder Reader packaging successful! Files can be found at ' + appPaths))
};
