const fs = require('fs');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

const temp = path.join(os.tmpdir(), 'wonderReader');

const clearCache = () => {
  fs.readdir(temp, (err, files) => {
    for (let i in files) {
      const file = files[i];
      rimraf.sync(file);
    }
  });
};

export default clearCache;
