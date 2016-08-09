
var path = require('path');

var cleaned = path.join('app', 'cache', 'Amethyst - Princess of Gemworld v2 #02 (of 16) (1985).cbr', 'Amethyst v2 #02- 000.jpg');

var b = cleaned.split("/").map(encodeURIComponent).toString().replace(/,/g, '/');
var c = path.join(b)
var d = decodeURIComponent(c)
console.log(cleaned)
console.log(b)
console.log(c)
console.log(d)
