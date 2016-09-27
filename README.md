# Wonder-Reader

Version 0.2.3

## Downloads

[Downloads](http://alice-em.github.io/Wonder-Reader/)

## Installation and Starting
__Requirements__: Git, Node, and NPM

```shell
git clone https://github.com/alice-em/Wonder-Reader.git
cd Wonder-Reader
npm install
npm start
```

## Compiling
__Requirements__: electron-packager

### Terminal
* Go to where you cloned __Wonder Reader__ `cd/to/git/Wonder-Reader`

* OSX / Darwin

		  electron-packager ./ --platform=darwin --arch=x64 --out=../Wonder-Reader-Releases --prune=true --icon=./shieldIcon.icns

* Windows

		  electron-packager ./ --platform=win32 --arch=x64 --out=../Wonder-Reader-Releases --prune=true --icon=./shieldIcon.ico

* Linux

		  electron-packager ./ --platform=linux --arch=x64 --out=../Wonder-Reader-Releases --prune=true

## Development
__Requirements__: Grunt-cli, Sass, and some sort of text-editor

TODO:
* Any other neat ideas that could work go here too.
	* Create a bookmarking system
	* Double click zoom in function!
  * Comics at either __firstPage__ or __lastPage__ can open up the next file in library folder.

## Notes
* node.fs API :: ( https://nodejs.org/api/fs.html )
* electron.io API et Docs :: ( http://electron.atom.io/docs/ )

## Credit

* CSS Loaders :: https://github.com/lukehaas/css-loaders
* Dragscroll.js :: https://github.com/asvd/dragscroll
* Electron :: http://electron.atom.io
* Font Awesome :: http://fontawesome.io/
* Node :: https://nodejs.org/en/
* Node Directory Tree :: https://github.com/mihneadb/node-directory-tree
* Logo design by Jake Brockway :: http://jacobvbrockway.weebly.com
