const colors = require('colors');
const fs = require('fs');
const mkdirp = require('mkdirp');
const packager = require('electron-packager');
const path = require('path');
const rimraf = require('rimraf');

const platform = process.platform;
var build = './build';
mkdirp.sync(build);
var files = fs.readdirSync(build);
for (let i = 0; i < files.length; i++) {
  console.log(`Removing ${files[i]}.`)
  rimraf.sync(path.join(build, files[i]));
};
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
  console.log(colors.magenta('Wonder Reader packaging successful! Files can be found at ' + appPaths));
};
