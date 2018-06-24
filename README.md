[![devDependencies Status](https://david-dm.org/alice-em/wonder-reader/dev-status.svg?style=flat-square)](https://david-dm.org/alice-em/wonder-reader?type=dev)

## Wonder Reader :: A modern comic book reader for Windows, OSX, and Linux
Wonder Reader was written with React, Electron, Node, and a love for all things dorky.

## Downloads
###### Windows
###### OSX / Darwin
###### Linux
* Also available via Snapcraft!
* `snap install wonder-reader`

## Requirements for development
`git`, `npm`, `node`, `yarn`, & `bash`

## Install

* **Note: requires a node version >= 7 and an npm version >= 4.**
* **If you have installation or compilation issues with this project, please see [the debugging guide](https://github.com/chentsulin/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone https://github.com/alice-em/wonder-reader.git
```

And then install dependencies with yarn.

```bash
$ cd wonder-reader
$ yarn
```
**Note**: If you can't use [yarn](https://github.com/yarnpkg/yarn), run `npm install`.

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ npm run dev
```

Alternatively, you can run the renderer and main processes separately. This way, you can restart one process without waiting for the other. Run these two commands **simultaneously** in different console tabs:

```bash
$ npm run start-renderer-dev
$ npm run start-main-dev
```

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://www.electron.build/multi-platform-build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:
```bash
DEBUG_PROD=true npm run package
```
