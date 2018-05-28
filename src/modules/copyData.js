const copyArray = (array) => {
  const i = [].slice.call(array);
  return i;
};

const copyFunction = (func) => {
  const i = func.bind({});
  return i;
};

const copyObject = (obj) => {
  const i = Object.assign({}, obj);
  return i;
};

const copyDeepObject = (obj) => {
  const i = JSON.parse(JSON.stringify(obj));
  return i;
};

const copyString = (string) => {
  const i = string.slice(0);
  return i;
};

export {
  copyArray,
  copyFunction,
  copyObject,
  copyDeepObject,
  copyString
};
