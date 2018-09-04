import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Header from './Header';
import Library from './Library';
import Loading from './Loading';
import PageViewer from './PageViewer';
import theme from './theme';

import encodepath from '../modules/encodepath';
import File from '../modules/File';
import { generateCenterfolds } from '../modules/generate';
import { strainOnlyComics } from '../modules/strain';
import turnPage from '../modules/turnPage';

import initState from '../store/initState';

const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const includes = (ARRAY, index) =>
  ARRAY.includes(index) || ARRAY.includes(index + 1);

export default class App extends Component {
  state = initState;

  componentDidMount() {
    window.addEventListener('keydown', e => {
      const isActiveElemInput = document.activeElement.tagName === 'input';
      const shouldTurn = this.isComicActive && !isActiveElemInput;
      if (shouldTurn) {
        this.arrowKeyTurnPage(e.code, shouldTurn);
      }
    });
  }

  arrowKeyTurnPage = code => {
    if (code === 'ArrowRight') {
      this.turnPageRight();
    } else if (code === 'ArrowLeft') {
      this.turnPageLeft();
    }
  };

  changePageCount = () => {
    const { pageCount } = this.state;
    const newPageCount = pageCount === 2 ? 1 : 2;
    this.setState({ pageCount: newPageCount }, () => {
      this.postChangePageCount();
    });
  };

  closeLibrary = () => {
    this.toggleDrawer('top', false);
  };

  determineAvailableAdjComic = (err, files, polarity) => {
    const { openedComic } = this.state;
    const { name, origin } = openedComic;

    const strainedComics = strainOnlyComics(files);
    const newIndex = strainedComics.indexOf(name) + polarity;
    const isNewIndexWithinPageLimits =
      newIndex > -1 && newIndex < strainedComics.length;
    if (isNewIndexWithinPageLimits) {
      const newComicFilepath = path.join(
        path.dirname(origin),
        strainedComics[newIndex]
      );
      this.openComic(newComicFilepath);
    }
  };

  generatePages = (tempdir, cb) => {
    fs.readdir(tempdir, (err, files) => {
      const pages = this.mapPages(files, tempdir);
      cb(pages);
    });
  };

  generateEncodedPage = (key, bool, encodedPages) => {
    const { openedComic } = this.state;
    const { pages, tempdir } = openedComic;

    const pagePath = path.join(tempdir, pages[key]);
    const page = encodepath(pagePath);
    const { width, height } = sizeOf(pagePath);
    const ratio = bool ? 1 : encodedPages[0].height / height;
    const applyRatio = item => item * ratio;
    const [WIDTH, HEIGHT] = [width, height].map(applyRatio);
    return {
      page,
      key,
      width: WIDTH,
      height: HEIGHT
    };
  };

  generateEncodedPages = (newPageIndex, pagesToDisplay) => {
    const { pageCount, pages } = this.state;

    const encodedPages = [];
    const pagesToRender = Math.min(pageCount, pagesToDisplay);
    for (let i = 0; i < pagesToRender; i += 1) {
      const key = newPageIndex + i;
      if (key < pages.length) {
        const bool = key === newPageIndex;
        encodedPages[i] = this.generateEncodedPage(key, bool, encodedPages);
      }
    }
    return encodedPages;
  };

  generatePageImage = page => {
    const img = new Image();
    img.src = page.encodedPagePath;
    return img;
  };

  ButtonFunctions = () => {
    const {
      changePageCount,
      openLibrary,
      openNextComic,
      openPrevComic,
      turnPageLeft,
      turnPageRight
    } = this;
    return {
      changePageCount,
      openLibrary,
      openNextComic,
      openPrevComic,
      turnPageLeft,
      turnPageRight
    };
  };

  isCenterfold = index => {
    const { centerfolds } = this.state;
    return centerfolds.includes(index);
  };

  isCenterfoldsComing = () => {
    const { centerfolds, currentPageIndex } = this.state;
    return includes(centerfolds, currentPageIndex);
  };

  isComicActive = () => {
    const { openedComic } = this.state;
    return openedComic.name !== null;
  };

  mapPages = (files, tempdir) =>
    files.map((file, key) => {
      const pagePath = path.join(tempdir, file);
      const encodedPagePath = encodepath(pagePath);
      return {
        key,
        encodedPagePath,
        pagePath
      };
    });

  openComic = fullpath => {
    this.setState({ isLoading: true }, () => {
      const Comic = new File(fullpath);
      Comic.extract(this.postComicExtract);
    });
  };

  openAdjacentComic = polarity => {
    const { openedComic } = this.state;
    if (this.isComicActive()) {
      const originDirname = path.dirname(openedComic.origin);
      fs.readdir(originDirname, (err, files) => {
        this.determineAvailableAdjComic(err, files, polarity);
      });
    }
  };

  openLibrary = () => {
    this.toggleDrawer('top', true);
  };

  openNextComic = () => {
    const polarity = 1;
    this.openAdjacentComic(polarity);
  };

  openPrevComic = () => {
    const polarity = -1;
    this.openAdjacentComic(polarity);
  };

  postChangePageCount = () => {
    const { currentPageIndex, pageCount } = this.state;

    if (this.isComicActive()) {
      if (pageCount === 2 && this.isCenterfoldsComing()) {
        this.setCurrentPages(currentPageIndex, 1);
      } else {
        this.setCurrentPages(currentPageIndex, pageCount);
      }
    }
  };

  postComicExtract = comic => {
    if (comic.error) {
      this.throwError(true, comic.errorMessage);
    } else {
      this.generatePages(comic.tempdir, page => {
        this.postGeneratePages(page, comic);
      });
    }
  };

  generateInitialLoadState = pages => {
    const { pageCount } = this.state;
    const getPagePath = page => page.pagePath;
    const pagePaths = pages.map(getPagePath);
    const centerfolds = generateCenterfolds(pagePaths);
    const pagesToDisplay = includes(centerfolds, 0) || pageCount === 1 ? 1 : 2;
    const encodedPages = this.generateEncodedPages(0, pagesToDisplay);

    return {
      centerfolds,
      currentPageIndex: 0,
      encodedPages,
      images: pages.map(this.generatePageImages),
      isLoading: false,
      top: false
    };
  };

  postGeneratePages = (pages, openedComic) => {
    const {
      centerfolds,
      currentPageIndex,
      encodedPages,
      images,
      isLoading,
      top
    } = this.generateInitialLoadState(pages);

    this.setState({
      centerfolds,
      currentPageIndex,
      encodedPages,
      openedComic,
      images,
      isLoading,
      pages,
      top
    });
  };

  saveContentDataToMain = content => {
    this.setState({ content });
  };

  setCurrentPages = (newPageIndex, pagesToDisplay) => {
    const encodedPages = this.generateEncodedPages(
      newPageIndex,
      pagesToDisplay
    );
    this.setState({
      currentPageIndex: newPageIndex,
      encodedPages
    });
  };

  setZoomLevel = value => {
    const zoomLevel = Number(value);
    this.setState({ zoomLevel });
  };

  shouldPageTurn = () => {
    const { currentPageIndex, pageCount, pages } = this.state;
    const isUltimatePage = currentPageIndex === pages.length - 1;
    const isPenultimatePage = currentPageIndex === pages.length - 2;

    const offChance =
      // Is current page second to last? And...?
      isPenultimatePage &&
      // And is the viewer set to 2 pages?
      pageCount === 2 &&
      // Also if there is a CenterFold for the (pen/)ultimate page, don't skip it!
      !this.isCenterfoldsComing();

    return !(isUltimatePage || offChance);
  };

  shouldPageTurnLeft = () => {
    const { currentPageIndex } = this.state;
    return currentPageIndex !== 0;
  };

  shouldPageTurnRight = () => {
    const shouldPageTurn = this.shouldPageTurn();
    return shouldPageTurn;
  };

  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open
    });
  };

  toggleOptions = () => {
    this.toggleDrawer('options', !this.options);
  };

  throwError = (error, errorMessage) => {
    if (error) {
      this.setState({ errorMessage }, () => {
        console.log(this.state.errorMessage);
        // TODO Spawn error module;
      });
    }
  };

  turnPage = polarity => {
    const { centerfolds, currentPageIndex, pageCount, pages } = this.state;

    if (this.isComicActive()) {
      turnPage(
        currentPageIndex,
        centerfolds,
        pageCount,
        pages.length,
        polarity,
        (newPageIndex, pagesToDisplay) => {
          this.setCurrentPages(newPageIndex, pagesToDisplay);
        }
      );
    }
  };

  turnPageLeft = () => {
    const polarity = -1;
    console.log('turnPageLeft');
    console.log(this.shouldPageTurnLeft());
    if (this.shouldPageTurnLeft()) {
      this.turnPage(polarity);
    }
  };

  turnPageRight = () => {
    const polarity = 1;
    if (this.shouldPageTurnRight()) {
      this.turnPage(polarity);
    }
  };

  renderHeader = () => {
    const { pageCount, zoomLevel } = this.state;

    return (
      <Header
        ButtonFunctions={this.ButtonFunctions}
        pageCount={pageCount}
        setZoomLevel={this.setZoomLevel}
        zoomLevel={zoomLevel}
      />
    );
  };

  renderLibrary = () => {
    const { content, top } = this.state;

    return (
      <Library
        closeDrawer={this.closeLibrary}
        loadedLibrary={content.fullpath}
        openComic={this.openComic}
        saveContentDataToMain={this.saveContentDataToMain}
        top={top}
      />
    );
  };

  renderPageViewer = () => {
    const { encodedPages, zoomLevel } = this.state;
    return <PageViewer encodedPages={encodedPages} zoomLevel={zoomLevel} />;
  };

  render() {
    console.log('Main (state):', this.state);
    const { isLoading } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="main">
          {this.renderHeader()}
          {this.renderLibrary()}
          {this.renderPageViewer()}
          <Loading isLoading={isLoading} />
        </div>
      </MuiThemeProvider>
    );
  }
}
