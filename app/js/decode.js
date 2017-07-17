// for decoding file paths -- currently not used

module.exports = (elem) => {
  return process.platform === 'win32'
    ? decodeURIComponent(elem.src.substr(8))
    : decodeURIComponent(elem.src.substr(7));
};
