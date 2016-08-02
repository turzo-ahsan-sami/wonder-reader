var fs = require('fs');
var path = require('path');
var imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable file types
var dir = "/Users/alice_em/Documents/Git/Wonder-Reader/app/cache/Doctor Fate 001 (2015) (Digital) (ThatGuy-Empire)/Dr. Fate (2015-) 001";
var dirContents = fs.readdirSync(dir)
console.log(dirContents);
var dirFiltered = dirContents.filter(function(x, i) {return imgTypes.indexOf(path.extname(dirContents[i])) > -1});
console.log(dirFiltered);
