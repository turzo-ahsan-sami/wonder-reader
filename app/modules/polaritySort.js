const isPropPresent = prop => typeof prop !== 'undefined';
const targetProperty = (val, prop) =>
  isPropPresent(prop) ? val[prop].toLowerCase() : val.toLowerCase();

const basenameSort = (a, b, prop) => {
  const selectProp = item => targetProperty(item, prop);
  const [A, B] = [a, b].map(selectProp);
  const polarity = A < B ? -1 : 1;
  return (A === B) ? 0 : polarity;
};

export default basenameSort;
