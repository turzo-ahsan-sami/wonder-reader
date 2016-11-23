// library.js : to populate the library with an interactive list of available selections

const $ = require('jquery')
const bookmark = require('./bookmark.js')
const {dialog} = require('electron').remote
const dirFunction = require('./directory.js')
const dirTree = require('directory-tree') // https://www.npmjs.com/package/directory-tree
const fs = require('fs')
const isThere = require('is-there')
const jsonfile = require('jsonfile') // https://www.npmjs.com/package/jsonfile
const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')

const config = path.join(os.tmpdir(), 'wonderReader', 'json', 'config.json')
const comics = path.join(os.tmpdir(), 'wonderReader', 'json', 'comics.json')

// Builds the library with proper HTML
libBuilder = (directory, array, listID) => {
    $('#libStatus').remove()
    for (let i = 0; i < array.length; i++) {
        let file = array[i].name
        let filePath = path.join(directory, file)

    // Inserts file.loader() for files
        if (fs.statSync(filePath).isFile()) {
            let fileTarget = dirFunction.encode(filePath)
            $(`#${listID}`).append(
        `<li class="file"><a href="#" onclick="file.loader('${fileTarget}')"><i class="fa fa-file" aria-hidden="true"></i>${file} ${bookmark.percent(file)}</a></li>`
      )

    // Deep scans interior folders
        } else if (fs.statSync(filePath).isDirectory()) {
            let newListID = (`${listID}${file}`).replace(/\s|#|\(|\)|\'|,|&|\+|-/g, '')
            $(`#${listID}`).append(
        `<li class="folder"><a href="#" onclick="libFolders('${newListID}')"><i class="fa fa-folder" aria-hidden="true"></i><i class="fa fa-caret-down rotate" aria-hidden="true"></i>${file}</a></li><ul id=${newListID}>`
      )
            libBuilder(filePath, array[i].children, newListID)
            $(`#${listID}`).append('</ul>')
        } else {
          // Do Nothing
        }
    }
    $('#repeat').removeClass('rotater')
}

// Dialog to open up directory
exports.openDir = () => {
    dialog.showOpenDialog({
        properties: [
            'openDirectory'
        ]
    },
  function (fileNames) {
      if (fileNames === undefined) return

      let obj = {'library': fileNames[0]}
      let dirArray = dirTree(fileNames[0], ['.cbr', '.cbz'])

      jsonfile.writeFileSync(comics, dirArray, {'spaces': 2})
      jsonfile.writeFileSync(config, obj)
      $('#ulLib li, #ulLib ul').remove()
      $('#repeat').addClass('rotater')
      libBuilder(fileNames[0], dirArray.children, 'ulLib')
  })
}

// Exported version of libBuilder()
exports.builder = () => {
    let configJSON = jsonfile.readFileSync(config)
    let dirArray = dirTree(configJSON.library, ['.cbr', '.cbz'])
    $('#ulLib li, #ulLib ul').remove()
    $('#repeat').addClass('rotater')
    libBuilder(configJSON.library, dirArray.children, 'ulLib')
}

// Loads library on program start
exports.onLoad = () => {
    let text = 'The library is empty. Click <span class="code"><i class="fa fa-search"></i></span> to load a directory.'
    if (isThere(config)) {
        let configJSON = jsonfile.readFileSync(config)
        if (configJSON.library !== undefined) {
            let dirArray = dirTree(configJSON.library, ['.cbr', '.cbz'])
            libBuilder(configJSON.library, dirArray.children, 'ulLib')
        } else {
            $('#libStatus').append(text)
        }
    } else {
        mkdirp.sync(path.join(os.tmpdir(), 'wonderReader', 'json'))
        fs.writeFileSync(config, '{}')
        $('#libStatus').append(text)
    }
}
