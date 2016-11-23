// page.js turns pages.

const $ = require('jquery')
const bookmark = require('./bookmark.js')
const center = require('./centerfold.js')
const fs = require('fs')
const path = require('path')
const sizeOf = require('image-size')
const strain = require('./strain.js')

let centerFolds, dirContents, fileDir, fileName, filePath

const viewOne = document.getElementById('viewImgOne')
const viewTwo = document.getElementById('viewImgTwo')
const column = document.getElementById('column')

exports.load = (file) => {
    let index, continueIndex, val, r

    filePath = decodeURIComponent(viewOne.src.substr(7))
    if (process.platform === 'win32') {
        filePath = decodeURIComponent(viewOne.src.substr(8))
    }
    fileName = path.basename(filePath)
    fileDir = path.dirname(filePath)
    dirContents = strain(fs.readdirSync(fileDir))
    centerFolds = center.fold('viewImgOne')

    index = 0
    continueIndex = Number(bookmark.onLoad(file, dirContents))
    if (continueIndex > 0) {
        r = confirm(`Continue ${path.basename(file)} at page ${continueIndex}`)
        if (r === true) {
            index = continueIndex
        } else {
            index = 0
        }
    }
    val = Number(column.dataset.val)

    if (val === 1) {
        singlePage(fileDir, dirContents, index)
    } else {
        defaults(fileDir, dirContents, index)
    }
}

pageTurn = (val) => {
    let index, polarity

    filePath = decodeURIComponent(viewOne.src.substr(7))
    if (process.platform === 'win32') {
        filePath = decodeURIComponent(viewOne.src.substr(8))
    }
    fileName = path.basename(filePath)
    index = Number(dirContents.indexOf(fileName))
    val = Number(val)

    polarity = 1
    if (val < 0) {
        polarity = -1
    }

  // Limits Val to range
    if (index + val >= dirContents.length - 1) { // For last page
        if (Math.abs(val) === 2 && index === dirContents.length - 2) {
            if (centerFolds.indexOf(dirContents.length - 1) > -1) {
                index = dirContents.length - 1
                singlePage(fileDir, dirContents, index)
            } else {
                index = dirContents.length - 2
                defaults(fileDir, dirContents, index)
            }
        } else {
            index = dirContents.length - 1
            singlePage(fileDir, dirContents, index)
        }
    } else if (index + val <= 0) { // For first page
        index = 0
        defaults(fileDir, dirContents, index)
    } else {
        if (centerFolds.length === 0) {
          // For no centerFolds. This is easy
            index = index + val
            if (index === dirContents.length - 1) {
                singlePage(fileDir, dirContents, index)
            } else {
                defaults(fileDir, dirContents, index)
            }
        } else {
          // For when any CenterFold exists //
            if (centerFolds.indexOf(index + polarity) > -1) {
                index = index + polarity
                singlePage(fileDir, dirContents, index)
            } else if (centerFolds.indexOf(index + val) > -1) {
                index = index + val
                singlePage(fileDir, dirContents, index)
            } else if (centerFolds.indexOf(index) > -1) {
                if (polarity > 0) {
                    index = index + polarity
                } else {
                    index = index + val
                }
                defaults(fileDir, dirContents, index)
            } else {
                index = index + val
                defaults(fileDir, dirContents, index)
            }
        }
    }
    bookmark.onChange(index) // Updates bookmark.json
}

singlePage = (fileDir, dirContents, index) => { // For Single page viewing and styling
    viewOne.style.width = '100%'
    viewTwo.style.display = 'none'
    viewOne.src = path.join(fileDir, encodeURIComponent(dirContents[index]))
    viewTwo.src = path.join('images', 'FFFFFF-0.0.png')
}

defaults = (fileDir, dirContents, index) => {
    let val = Number(column.dataset.val)

    if (Math.abs(val) === 2) {
        if (index >= dirContents.length - 1 || centerFolds.indexOf(index) > -1 || centerFolds.indexOf(index + 1) > -1/* || centerFolds.indexOf(index + polarity) > -1*/) {
            singlePage(fileDir, dirContents, index)
        } else {
            viewOne.style.display = 'initial'
            viewTwo.style.display = 'initial'
            viewOne.src = path.join(fileDir, encodeURIComponent(dirContents[index]))
            viewTwo.src = path.join(fileDir, encodeURIComponent(dirContents[index + 1]))

            let sizeOne = sizeOf(path.join(fileDir, dirContents[index]))
            let sizeTwo = sizeOf(path.join(fileDir, dirContents[index + 1]))
            let ratioOne = sizeOne.width / sizeOne.height
            let ratioTwo = sizeTwo.width / sizeTwo.height

            viewOne.style.width = `${ratioOne / (ratioOne + ratioTwo) * 100}%`
            viewTwo.style.width = `${ratioTwo / (ratioOne + ratioTwo) * 100}%`
        }
    } else if (Math.abs(val) === 1) { // If val == 1
        singlePage(fileDir, dirContents, index)
    } else {
        alert(`Danger! Danger! Will Robinson!\nErr: Invalid variable val: ${val}`)
    }
}

exports.Right = () => { // See page.spread()
    let val = column.dataset.val
    pageTurn(val)
}

exports.Left = () => {
    let val = column.dataset.val * -1
    pageTurn(val)
}

exports.spread = () => {
    filePath = decodeURIComponent(viewOne.src.substr(7))
    if (process.platform === 'win32') {
        filePath = decodeURIComponent(viewOne.src.substr(8))
    }
    let index = dirContents.indexOf(path.basename(filePath))

    if ($('#column').hasClass('disabled')) {
        $('#column').removeClass('disabled')
        column.dataset.val = 2
        defaults(fileDir, dirContents, index)
    } else {
        $('#column').addClass('disabled')
        column.dataset.val = 1
        singlePage(fileDir, dirContents, index)
    }
}
