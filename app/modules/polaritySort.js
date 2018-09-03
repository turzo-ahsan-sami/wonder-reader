const basenameSort = (a, b, prop) => {
  const targetProp = typeof prop !== 'undefined';
  const selectProperty = val =>
    targetProp ? val[prop].toLowerCase() : val.toLowerCase();
  const nameA = selectProperty(a);
  const nameB = selectProperty(b);
  const polarity = nameA < nameB ? -1 : 1;
  return nameA === nameB ? 0 : polarity;
};

export default basenameSort;
