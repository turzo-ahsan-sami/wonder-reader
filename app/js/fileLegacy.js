function rarExtractor(fileName, tempFolder, looper) {
  var rar = new unrar(fileName);
  rar.extract(tempFolder, null, function (err) {
    if (err) {
      alert(err);
    }
    tempFolder = directory.merge(tempFolder);
    dirContents = fs.readdirSync(tempFolder);

    if (dirContents.length == 0 && looper <= 3) {
      looper++;
      console.log('Loop = ' + looper);
      zipExtractor(fileName, tempFolder, looper);
    } else if (looper > 3) {
      alert('Possible broken file?');
    } else {
      $('#loader').addClass('hidden').removeClass('loader');
      $('#bgLoader').addClass('hidden');
      postExtract(fileName, tempFolder, dirContents);
    }
  });
};

function zipExtractor(fileName, tempFolder, looper) {
  extract(fileName, {dir: tempFolder}, function (err) {
    if (err) {
      alert(err);
    }
    tempFolder = directory.merge(tempFolder);
    dirContents = fs.readdirSync(tempFolder);

    if (dirContents.length == 0 && looper <= 3) {
      looper++;
      console.log('Loop = ' + looper);
      rarExtractor(fileName, tempFolder, looper);
    } else if (looper > 3) {
      alert('Possible broken file?');
    } else {
      $('#loader').addClass('hidden').removeClass('loader');
      $('#bgLoader').addClass('hidden');
      postExtract(fileName, tempFolder, dirContents);
    };
  });
}
