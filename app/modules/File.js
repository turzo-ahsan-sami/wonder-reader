// To handle file extraction, error checking, and for setting temp directories
import {
  isImage,
  strainImages
} from '../modules/strain';

const decompress = window.require('decompress');
const fs = window.require('fs');
const isRar = require('./isRar.js');
const isZip = require('is-zip');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const rar = require('@fknop/node-unrar');
const rimraf = require('rimraf');
const Unrar = require('node-unrar');

const temp = path.join(os.tmpdir(), 'wonderReader');
const regex = /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|\[|\{|\]|\}|\||\\|'|<|,|\.|>|\?|\/|""|;|:/gi;

class File {
  constructor(filepath) {
    this.name = path.basename(filepath);
    this.basename = path.basename(this.name, path.extname(this.name)).replace(regex, '');
    this.tempdir = path.join(temp, this.basename.toLowerCase());
    this.extname = path.extname(this.name).toLowerCase();
    this.origin = filepath;

    this.pending = 0;
    this.error = false;
    this.errorMessage = '';
    this.data = '';
  }

  // cb(comic) => {}

  extract(cb) {
    console.log('Let\'s see what\'s going on here:', this);
    fs.readFile(this.origin, (err, data) => {
      if (!err) {
        this.data = data;
        mkdirp(this.tempdir, (errd) => {
          if (errd) {
            this.error = true;
            this.errorMessage = 'Error: Failed to create temp folder;';
            return;
          }
          if (this.isRar()) {
            this.extractRar(cb);
          } else if (this.isZip()) {
            this.extractZip(cb);
          } else {
            this.error = true;
            this.errorMessage = 'Error: File must be a CBR or CBZ. Compression method is incorrect;';
          }
        });
      }
    });
  }

  // TODO: see how to create a deb file with dependencies
  // TODO: create snap with dependencies

  extractRarLinux(cb) {
    console.log('Inflating file (rar-linux)');
    const urar = new Unrar(this.origin);
    urar.extract(this.tempdir, null, (err) => {
      if (err) {
        this.error = true;
        return;
      }
      this.standardize(this.tempdir);
      this.updatePages(cb);
    });
  }

  extractRar(cb) {
    if (os.platform() === 'linux') {
      this.extractRarLinux(cb);
      return;
    }
    console.log('Inflating file (rar)');
    rar.extract(this.origin, this.tempdir);
    this.standardize(this.tempdir);
    this.updatePages(cb);
  }

  extractZip(cb) {
    console.log('Inflating file (zip)');
    decompress(this.origin, this.tempdir)
      .then(() => {
        this.standardize(this.tempdir);
        this.updatePages(cb);
      });
  }

  fileMover(filepath) {
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      this.standardize(filepath);
      if (filepath !== this.tempdir) {rimraf.sync(filepath);}
    } else if (stats.isFile() && isImage(filepath)) {
      const basename = path.basename(filepath);
      const output = path.join(this.tempdir, basename);
      fs.renameSync(filepath, output);
    } else {
      rimraf.sync(filepath);
    }
  }

  isRar() {
    return isRar(this.data);
  }

  isZip() {
    return isZip(this.data);
  }

  // initialize with this.tempdir
  standardize(directory) {
    const files = fs.readdirSync(directory);
    const filepaths = files.map((file) => path.join(directory, file));
    for (const filepath of filepaths) {
      this.fileMover(filepath);
    }
  }

  updatePages(cb) {
    fs.readdir(this.tempdir, (err, files) => {
      const strainedFiles = strainImages(files);
      this.pages = strainedFiles;
      cb(this);
    });
  }
}

export default File;
