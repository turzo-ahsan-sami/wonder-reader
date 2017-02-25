const colors = require('colors');
const fs = require('fs');
const jsonfile = require('jsonfile');
const mkdirp = require('mkdirp');
const packager = require('electron-packager');
const path = require('path');
const rimraf = require('rimraf');

const platform = process.platform;
const version = jsonfile.readFileSync('package.json').version;

let postPackage;

console.log(colors.red(`Compiling Wonder Reader ${version}.`));
let build = path.join('.', 'build', version);
let ignoredPaths = fs.readdirSync(path.join('.','build'));
mkdirp.sync(build);
let files = fs.readdirSync(build);
for (let i = 0; i < files.length; i++) {
  console.log(`Removing ${files[i]}.`);
  rimraf.sync(path.join(build, files[i]));
}
console.log(colors.red('This may take a few minutes.'));
packager(
  {
    dir: './',
    name: 'Wonder Reader',
    platform: platform,
    arch: 'x64',
    prune: true,
    out: build,
    ignore: ignoredPaths,
    icon: './shieldIcon'
  },
  function cb(err, appPaths) {
    postPackage(appPaths);
  }
);

postPackage = (appPaths) => {
  console.log(colors.magenta(`Wonder Reader packaging successful! Files can be found at ${appPaths}`));
};
