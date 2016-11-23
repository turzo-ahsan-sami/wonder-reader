// strain.js cleans out the dirty files, like .DS_Store

const path = require('path')
const imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'] // Allowable File Types

// Cleans out non image files from array
module.exports = (array) => {
    array = array.filter(function (x, i) {
        return imgTypes.indexOf(path.extname(array[i]).toLowerCase()) > -1
    })
    array = array.sort()
    return array
}
