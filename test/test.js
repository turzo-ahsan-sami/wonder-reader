var centerFolds = [1,5,8,11,16,19,21,25,26,31]
var diff = [centerFolds[0]]; // Factors difference between values
var parity = [centerFolds[0]%2]; // 0 for EVEN, 1 for ODD

for (i=1; i < centerFolds.length; i++) {
  diff.push(centerFolds[i] - centerFolds[i-1]);
  parity.push((centerFolds[i] - centerFolds[i-1]) % 2);
};

console.log('centerFolds array : ' + centerFolds + ' with length: ' + centerFolds.length);
console.log('diff array : ' + diff + ' with length: ' + diff.length);
console.log('parity array : ' + parity + ' with length: ' + parity.length);
