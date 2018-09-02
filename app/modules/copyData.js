const copyArray = array => [].slice.call(array);

const copyFunction = func => func.bind({});

const copyObject = obj => Object.assign({}, obj);

const copyDeepObject = obj => JSON.parse(JSON.stringify(obj));

const copyString = string => string.slice(0);

export { copyArray, copyFunction, copyObject, copyDeepObject, copyString };
