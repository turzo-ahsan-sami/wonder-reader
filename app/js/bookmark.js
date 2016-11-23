const isThere = require('is-there')
const jsonfile = require('jsonfile')
const os = require('os')
const path = require('path')

let template = {} // {"name": "", "currentIndex": "0", "fullIndex": "0"}
let baseName, obj
let bookmark = path.join(os.tmpdir(), 'wonderReader', 'json', 'bookmark.json')
let regex = /\s|%|#|\(|\)|\.|-|_/gi // Reg Ex for classes

// Invoked on Comic.onLoad(), returns with current page
exports.onLoad = (filePath, directoryContents) => { // returns a new index for <img> tags
    baseName = path.basename(filePath)

    template = {}
    template.name = baseName
    template.currentIndex = 0
    template.fullIndex = directoryContents.length - 1

    if (isThere(bookmark)) {
        obj = jsonfile.readFileSync(bookmark)
        if (obj[baseName] !== undefined) { // if baseName is listed
      // console.log(`${baseName} located. Loading comic at index ${obj[baseName].currentIndex}`)
            return obj[baseName].currentIndex
        } else { // if baseName isn't listed, adds item to bookmark.json
            obj[baseName] = template
            jsonfile.writeFile(bookmark, obj, {spaces: 2}, function (err) {
                if (err) {
                    console.error(err)
                    return 0
                }
        // console.log(`Item, ${baseName}, added to bookmark.json.`)
                return 0
            })
        }
    } else {
        obj = {}
        obj[baseName] = template // Pushes into Array
        jsonfile.writeFileSync(bookmark, obj, {spaces: 2})
    // console.log('New bookmark.json created. Loading Comic at index 0')
        return 0
    }
}

// Updates JSON with current page
exports.onChange = (index) => {
    jsonfile.readFile(bookmark, function (err, obj) {
        if (err) { return err }
        obj[baseName].currentIndex = index
        jsonfile.writeFile(bookmark, obj, {spaces: 2}, function (err) {
            if (err) { return err }
        })
        let percent = (obj[baseName].currentIndex / obj[baseName].fullIndex) * 100
        let spanClass = obj[baseName].name.replace(regex, '')

        let elem = document.getElementsByClassName(spanClass)
        for (let i = 0; i < elem.length; i++) {
            elem[i].innerHTML = `${percent.toFixed(0)}%`
        }
    })
}

// Fills library with percentage read
exports.percent = (fileName) => {
    let spanClass = fileName.replace(regex, '')
    if (isThere(bookmark)) {
        obj = jsonfile.readFileSync(bookmark)
        if (obj[fileName]) {
      // console.log(`${obj[fileName].name}: ${obj[fileName].currentIndex} of ${obj[fileName].fullIndex}`)
            let percent = (obj[fileName].currentIndex / obj[fileName].fullIndex) * 100
            return `<span class="bookmark-percent ${spanClass}">${percent.toFixed(0)}%</span>`
        } else { return `<span class="bookmark-percent ${spanClass}">0%</span>` }
    } else {
        obj = {}
        jsonfile.writeFileSync(bookmark, obj, {spaces: 2})
        return `<span class="bookmark-percent ${spanClass}">0%</span>`
    }
}
