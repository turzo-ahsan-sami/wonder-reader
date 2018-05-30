import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import Header from './Header';
import Library from './Library';
import PageViewer from './PageViewer';

import ButtonFunction from '../modules/ButtonFunction';
import {copyDeepObject} from '../modules/copyData';
import encodepath from '../modules/encodepath';
import File from '../modules/File';
import {generateCenterfolds, generateNextComics} from '../modules/generate';
import turnPage from '../modules/turnPage';

const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

export default class Main extends Component {
  state = {
    openedComic: {
      name: null,
      basename: '',
      tempdir: '',
      extname: '',
      origin: '',

      pending: 0,
      error: false,
      errorMessage: '',
      stat: '',
    },
    pages: [{
      pagePath: null,
      encodedPagePath: null,
      key: null,
    }],

    // Page Data for Main => PageViewer => Page
    centerfolds: [],
    currentPageIndex: '',
    pageCount: 2,

    // Errors
    error: false,
    errorMessage: '',

    // Button Data to pass to Main => Header => ButtonBar
    buttons: {
      changePageCount :{
        name: 'changePageCount',
        disabled: false,
        func: () => {this.changePageCount();}
      },
      nextComic: {
        name: 'nextComic',
        disabled: true,
        func: () => {}
      },
      openLibrary: {
        name: 'openLibrary',
        disabled: false,
        func: () => {this.openLibrary();}
      },
      pageLeft: {
        name: 'pageLeft',
        disabled: true,
        func: () => {this.turnPageLeft();}
      },
      pageRight: {
        name: 'pageRight',
        disabled: true,
        func: () => {this.turnPageRight();}
      },
      prevComic: {
        name: 'prevComic',
        disabled: true,
        func: () => {}
      },
      options: {
        name: 'options',
        disabled: false,
        func: () => {this.toggleOptions();}
      },
      trash: {
        name: 'trash',
        disabled: false,
        func: () => {this.clearCache();}
      }
    },

    // Material UI Drawer data
    top: false,
    options: false,

    // Contents data for Library
    content: {},

    // Zoom data for PageViewer
    zoomLevel: 100,
  };

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (!(this.state.openedComic.name === null
      || document.activeElement.tagName === 'input')) {
        if (e.code === 'ArrowRight') {
          this.turnPageRight();
        } else if (e.code === 'ArrowLeft') {
          this.turnPageLeft();
        }
      }
    });
  }

  changePageCount = () => {
    const newPageCount = this.state.pageCount === 2 ? 1 : 2;
    console.log('changePageCount: ', newPageCount);
    this.setState({pageCount: newPageCount},() => {
      if (this.state.pageCount === 2) {
        if (
          this.state.centerfolds.indexOf(this.state.currentPageIndex) > -1 ||
          this.state.centerfolds.indexOf(this.state.currentPageIndex + 1) > -1) {
          this.setCurrentPages(this.state.currentPageIndex, 1);
          return;
        }
      }
      this.setCurrentPages(this.state.currentPageIndex, this.state.pageCount);
    });
  }

  clearCache = () => {
    console.log('clearing cache');
  }

  closeLibrary = () => {
    this.toggleDrawer('top', false);
  }

  generateAdjacentComics = () => {
    const newButtons = copyDeepObject(this.state.button);
    const nextComic = new ButtonFunction();
    const prevComic = new ButtonFunction();
    generateNextComics(this.origin, (nextOrigin, prevOrigin) => {
      if (nextOrigin) {
        nextComic.set(this.openedComic(nextOrigin), nextOrigin);
      }
      if (prevOrigin) {
        prevComic.set(this.openedComic(prevOrigin), prevOrigin);
      }
      newButtons.nextComic = nextComic;
      newButtons.prevComic = prevComic;
      this.setState({buttons: newButtons});
    });
  }

  generateKeys = (pages, cb) => {
    const pageKeys = Array.apply(null, {length: pages.length})
      .map(Function.call, Number);
    this.setState({pageKeys: pageKeys}, cb);
  }

  generatePages = (tempdir, cb) => {
    fs.readdir(tempdir, (err, files) => {
      const pages = files.map((file, i) => {
        const fullpath = path.join(tempdir, file);
        return {
          pagePath: fullpath,
          encodedPagePath: encodepath(fullpath),
          key: i,
        };
      });
      cb(pages);
    });
  }

  handleKeyPress = (e) => {
    console.log(e);
  }

  openComic = (fullpath) => {
    const comic = new File(fullpath);
    comic.extract((comic) => {
      if(comic.error) {this.throwError(true, comic.errorMessage);}
      this.generatePages(comic.tempdir, (pages) => {
        console.log(pages);
        const centerfolds = generateCenterfolds(pages);
        this.setState({
          centerfolds: centerfolds,
          openedComic: comic,
          pages: pages,
          top: false
        }, () => {
          console.log('openComic:', this.state);
          const pagesToDisplay = this.state.centerfolds.indexOf(0) > -1
            ? 2
            : 1;
          this.setCurrentPages(0, pagesToDisplay);
        });
      });
    });
  }

  openLibrary = () => {
    this.toggleDrawer('top', true);
  }

  saveContentDataToMain = (content) => {
    this.setState({content: content});
  }

  setCurrentPages = (newPageIndex, pagesToDisplay) => {
    const S = this.state;
    let newCurrentPages = [];
    let newEncodedPages = [];
    const pagesToRender = Math.min(S.pageCount, pagesToDisplay);
    console.log('setCurrentPages: ', S.openedComic);
    for (let i = 0; i < pagesToRender; i++) {
      const totalIndex = newPageIndex + i;
      if (totalIndex < S.openedComic.pages.length) {
        const comicPagePath = path.join(S.openedComic.tempdir, S.openedComic.pages[totalIndex]);
        const width = sizeOf(comicPagePath).width;
        newCurrentPages[i] = comicPagePath;

        newEncodedPages[i] = {
          page: encodepath(comicPagePath),
          key: totalIndex,
          width: width,
        };
      }
    }
    console.log(newCurrentPages);
    this.setState({
      currentPageIndex: newPageIndex,
      currentPages: newCurrentPages,
      encodedPages: newEncodedPages,
    });
  }

  setZoomLevel = (value) => {
    this.setState({zoomLevel: value});
  }

  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open
    });
  };

  toggleOptions = () => {
    this.toggleDrawer('options', !this.options);
  }

  throwError = (error, errorMessage) => {
    if (error) {
      this.setState({
        error: error,
        errorMessage: errorMessage
      }, () => {
        console.log(this.state.errorMessage);
        // TODO Spawn error module;
      });
    }
  }

  turnPage = (polarity) => {
    console.log('TurningPage: ', this);
    turnPage(
      this.state.currentPageIndex,
      this.state.centerfolds,
      this.state.pageCount,
      this.state.pages.length,
      polarity,
      (newPageIndex, pagesToDisplay) => {
        this.setCurrentPages(newPageIndex, pagesToDisplay);
      }
    );
  }

  turnPageLeft = () => {
    const polarity = -1;
    this.turnPage(polarity);
  }

  turnPageRight = () => {
    const polarity = 1;
    this.turnPage(polarity);
  }

  render() {
    console.log('Main (state):', this.state);
    return (
      <MuiThemeProvider theme={theme}>
        <div className="main">
          <Header
            buttons={this.state.buttons}
            changePageCount={this.changePageCount}
            pageCount={this.state.pageCount}
            setZoomLevel={this.setZoomLevel}
            zoomLevel={this.state.zoomLevel}/>
          <Library
            closeDrawer={this.closeLibrary}
            openComic={this.openComic}
            throwError={this.throwError}
            open={this.state.top}
            saveContentDataToMain={this.saveContentDataToMain}/>
          <PageViewer
            comic={this.state.openedComic}
            encodedPages={this.state.encodedPages}
            openComic={this.openComic}
            pageCount={this.state.pageCount}
            turnPage={this.turnPage}
            zoomLevel={this.state.zoomLevel}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
