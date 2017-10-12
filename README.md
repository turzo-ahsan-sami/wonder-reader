# Wonder-Reader

[![dependencies Status](https://david-dm.org/alice-em/wonder-reader/status.png)](https://david-dm.org/alice-em/wonder-reader)
[![GitHub version](https://badge.fury.io/gh/alice-em%2Fwonder-reader.svg)](https://badge.fury.io/gh/alice-em%2Fwonder-reader)
`0.5.1`
## Downloads

[Downloads](http://alice-em.github.io/wonder-reader/)

## Installation and Starting
__Requirements__: `git`, `node`, and `npm`

```shell
git clone https://github.com/alice-em/wonder-weader.git
cd wonder-reader
npm install
npm start
```

##### Compiling
__Requirements__: electron-packager

##### Terminal
* Go to where you cloned __Wonder Reader__ `cd/to/git/wonder-reader`

````
npm install
npm run packager
````
__Warning! :: 18 July 2017__ There is an issue with `>= npm@5.3.0` that interferes with compiling. Please use `<= npm@5.2.0` for the time being. Refer to `npm -v`, and if needed, run `npm i -g npm@5.2.0`

## Development
__Requirements__: `grunt-cli`, `sass`, and some sort of text-editor

##### TODO:
* Any other neat ideas that could work go here too.
* Double click zoom in function!
* Comics at either __firstPage__ or __lastPage__ can open up the next file in library folder.

##### Notes
* node.fs API :: https://nodejs.org/api/fs.html
* electron API :: http://electron.atom.io/docs/

##### Credit
* CSS Loaders :: https://github.com/lukehaas/css-loaders
* Dragscroll.js :: https://github.com/asvd/dragscroll
* Electron :: http://electron.atom.io
* Font Awesome :: http://fontawesome.io/
* Node :: https://nodejs.org/en/
* Node Directory Tree :: https://github.com/mihneadb/node-directory-tree
