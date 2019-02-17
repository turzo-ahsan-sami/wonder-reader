// To handle file extraction, error checking, and for setting temp directories
import { isImage, strain } from './strain';

const fs = require('fs');
const isDirectory = require('is-directory');
const isRar = require('is-rar');
const isZip = require('is-zip');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const rar = require('@fknop/node-unrar');
const rimraf = require('rimraf');
const StreamZip = require('node-stream-zip');
const Unrar = require('node-unrar');

const temp = path.join(os.tmpdir(), 'wonderReader');
const regex = /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|\[|\{|\]|\}|\||\\|'|<|,|\.|>|\?|\/|""|;|:/gi;

const text = {
  error: {
    fileType: 'Error: File must be a CBR or CBZ. Compression method is incorrect;',
    tempDirectory: 'Error: Failed to create temp folder;'
  }
};

class File {
  constructor(filepath) {
    this.name = path.basename(filepath);
    this.basename = path
      .basename(this.name, path.extname(this.name))
      .replace(regex, '');
    this.tempDirectory = path.join(temp, this.basename.toLowerCase());
    this.extname = path.extname(this.name).toLowerCase();
    this.origin = filepath;

    this.pending = 0;
    this.error = false;
    this.errorMessage = '';
    this.data = '';
  }

  extract(cb) {
    const handleMadeDirectory = err => {
      this.routeExtraction(err, cb);
    };
    const handleReadFile = (err, data) => {
      if (!err) {
        this.data = data;
        if (isDirectory.sync(this.tempDirectory)) {
          rimraf.sync(this.tempDirectory);
        }
        mkdirp(this.tempDirectory, handleMadeDirectory);
      }
    };

    fs.readFile(this.origin, handleReadFile);
  }

  extractRarLinux(cb) {
    const unrar = new Unrar(this.origin);
    const handleExtractedUnrar = err => {
      if (err) {
        this.error = true;
      } else {
        this.standardize(this.tempDirectory);
        this.updatePages(cb);
      }
    };

    unrar.extract(this.tempDirectory, null, handleExtractedUnrar);
  }

  extractRar(cb) {
    if (os.platform() === 'linux') {
      this.extractRarLinux(cb);
    } else {
      rar.extract(this.origin, this.tempDirectory);
      this.standardize(this.tempDirectory);
      this.updatePages(cb);
    }
  }

  extractZip(cb) {
    const zip = new StreamZip({
      file: this.origin,
      storeEntries: true
    });
    const handleExtractedZip = () => {
      this.standardize(this.tempDirectory);
      this.updatePages(cb);
    };
    const handledReadyZip = () => {
      zip.extract(null, this.tempDirectory, handleExtractedZip);
    };
    zip.on('ready', handledReadyZip);
  }

  fileMover(filepath) {
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      this.standardize(filepath);
      if (filepath !== this.tempDirectory) {
        rimraf.sync(filepath);
      }
    } else if (stats.isFile() && isImage(filepath)) {
      const basename = path.basename(filepath);
      const output = path.join(this.tempDirectory, basename);
      fs.renameSync(filepath, output);
    } else {
      rimraf.sync(filepath);
    }
  }

  isRar = () => isRar(this.data);

  isZip = () => isZip(this.data);

  routeExtraction = (err, cb) => {
    if (err) {
      this.error = true;
      this.errorMessage = text.error.tempDirectory;
    } else if (this.isRar()) {
      this.extractRar(cb);
    } else if (this.isZip()) {
      this.extractZip(cb);
    } else {
      this.error = true;
      this.errorMessage = text.error.fileType;
    }
  };

  standardize(directory) {
    // initialize with this.tempDirectory
    const files = fs.readdirSync(directory);
    const generateFilePath = file => path.join(directory, file);
    const moveFile = filePath => {
      this.fileMover(filePath);
    };
    const filePaths = files.map(generateFilePath);
    filePaths.forEach(moveFile);
  }

  updatePages(cb) {
    fs.readdir(this.tempDirectory, (err, files) => {
      this.pages = strain.images(files);
      cb(this);
    });
  }
}

export default File;
