# Wonder-Reader

Version 0.1.0 Alpha

__Requirements__: Git, Node, and NPM

## Installation and Starting

```shell
git clone https://github.com/alice-em/Wonder-Reader.git
cd Wonder-Reader
npm install
npm start
```

## Development
__Requirements__: Grunt-cli, Sass, and some sort of text-editor

Mary Marvel 001 is included under `example/` for testing purposes. The comic is listed on various Public Domain comic sites.

TODO:
* ~~Loading a file creates a __newWindow__, with navigation buttons "__naviBar__".  Maybe include some sort of skinning possibilities; TBD.~~ Ehh, I decided not to.
	* Comics at either __firstPage__ or __lastPage__ can open up the next file in library folder.
	* ~~__naviBar__: __firstPage__, __prevPage__, __nextPage__, __lastPage__,~~ __zoom__. Others will be included as soon as conceived.
* ~~Make sketch layouts.~~
* ~~__Trash__ needs to have warning, as well a function to stop from deleting currently opened file directory.~~
* ~~Check if folders and files exist, and load previous images if applicable.~~
* Any other neat ideas that could work go here too.
	* Create a bookmarking system
	* Reloop files into other extraction method if initial one fails. If both fail, err
	* Double click zoom in function!

## Notes
* node.fs API :: ( https://nodejs.org/api/fs.html )
* electron.io API et Docs :: ( http://electron.atom.io/docs/ )

```
> var array = []
undefined
> array[0]
undefined
> array[0] == true
false
> array[0] == false
false
> array.length
0
```

## Credit

* CSS Loaders :: https://github.com/lukehaas/css-loaders
* Dragscroll.js :: https://github.com/asvd/dragscroll
* Electron :: http://electron.atom.io
* Font Awesome :: http://fontawesome.io/
* Node :: https://nodejs.org/en/
* Node Directory Tree :: https://github.com/mihneadb/node-directory-tree
