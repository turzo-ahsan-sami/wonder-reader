module.exports = (elem) => {
  let output;
  output = decodeURIComponent(elem.src.substr(7));
  if (process.platform === 'win32') {
    output = decodeURIComponent(elem.src.substr(8));
  }
  return output;
};
