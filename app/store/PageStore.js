import { EventEmitter } from 'events';
import fs from 'fs';

import {
  TOGGLE_PAGE_COUNT,
  TURN_PAGE,
  TURN_PAGE_LEFT,
  TURN_PAGE_RIGHT
} from '../constants';
import dispatcher from '../dispatcher';
import ComicStore from './ComicStore';
import TopStore from './TopStore';

import {
  generateCenterfolds,
  generateEncodedPage,
  includes,
  mapPages,
} from '../modules/PageFunctions';
import turnPage from '../modules/turnPage';

class PageStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      centerfolds: [],
      currentPageIndex: '',
      encodedPages: [],
      pageCount: 2,
      pages: [],
    };
  }

  generateEncodedPages = (newPageIndex, pagesToDisplay) => {
    const {
      pageCount,
      pages
    } = this.state;

    const encodedPages = [];
    const pagesToRender = Math.min(pageCount, pagesToDisplay);
    for (let i = 0; i < pagesToRender; i += 1) {
      const key = newPageIndex + i;
      if (key < pages.length) {
        const bool = key === newPageIndex;
        encodedPages[i] = generateEncodedPage(key, bool, encodedPages);
      }
    }

    return encodedPages;
  };

  generateInitialLoadState = pages => {
    const {
      centerfolds,
      currentPageIndex,
      encodedPages,
    } = this.generateInitialPageState(pages);

    return {
      centerfolds,
      currentPageIndex,
      encodedPages,
      isLoading: false,
    };
  };

  generateInitialPageState = pages => {
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
      pages,
    };
  };

  generatePages = (tempdir, cb) => {
    fs.readdir(tempdir, (err, files) => {
      const pages = mapPages(files, tempdir);
      cb(pages);
    });
  };

  getAll = () => (this.state);
  getEncodedPages = () => (this.state.encodedPages)
  getPageCount = () => (this.state.pageCount)

  isCenterfold = index => (
    this.state.centerfolds.includes(index)
  );

  isCenterfoldsComing = () => (
    includes(
      this.state.centerfolds,
      this.state.currentPageIndex
    )
  );

  isDoublePage = () => (
    this.state.pageCount === 2
  )

  postChangePageCount = () => {
    const { currentPageIndex, pageCount } = this.state;

    if (ComicStore.isComicActive()) {
      if (pageCount === 2 && this.isCenterfoldsComing()) {
        this.setCurrentPages(currentPageIndex, 1);
      } else {
        this.setCurrentPages(currentPageIndex, pageCount);
      }
    }
  };

  postGeneratePages = (pages, openedComic) => {
    const {
      centerfolds,
      currentPageIndex,
      encodedPages,
      isLoading,
    } = this.generateInitialLoadState(pages);

    this.setState({
      centerfolds,
      currentPageIndex,
      encodedPages,
      openedComic,
      isLoading,
      pages,
    }, () => {
      TopStore.closeTopDrawer();
    });
  };

  setCurrentPages = (newPageIndex, pagesToDisplay) => {
    const encodedPages = this.generateEncodedPages(
      newPageIndex,
      pagesToDisplay
    );
    this.state = {
      currentPageIndex: newPageIndex,
      encodedPages
    };
    this.emit('change');
  };

  shouldPageTurnLeft = () => {
    const { currentPageIndex } = this.state;
    return currentPageIndex !== 0;
  };

  shouldPageTurnRight = () => {
    const { currentPageIndex, pageCount, pages } = this.state;
    const isUltimatePage = currentPageIndex === pages.length - 1;
    const isPenultimatePage = currentPageIndex === pages.length - 2;

    const offChance = (
      // Is current page second to last? And...?
      isPenultimatePage &&
      // And is the viewer set to 2 pages?
      pageCount === 2 &&
      // Also if there is a CenterFold for the (pen/)ultimate page, don't skip it!
      !this.isCenterfoldsComing()
    );

    return !(isUltimatePage || offChance);
  };

  togglePageCount = () => {
    const { pageCount } = this.state;
    this.state = {
      pageCount: pageCount === 2 ? 1 : 2
    };
    this.postChangePageCount();
    // this.emit('change');
  };

  turnPage = polarity => {
    if (ComicStore.isComicActive()) {
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
  };

  turnPageLeft = () => {
    this.turnPage(-1);
  }

  turnPageRight = () => {
    this.turnPage(1);
  }

  updateStore(obj) {
    this.state = obj;
    this.emit('change');
  }

  updateProp(prop, value) {
    this.state[prop] = value;
    this.emit('change');
  }

  handleActions(action) {
    switch(action.type) {
      case 'TOGGLE_PAGE_COUNT':
        this.togglePageCount();
        break;
      case 'TURN_PAGE_LEFT':
        this.turnPageLeft();
        break;
      case 'TURN_PAGE_RIGHT':
        this.turnPageRight();
        break;
    }
  }
}

const pageStore = new PageStore;
dispatcher.register(pageStore.handleActions.bind(pageStore));
export default pageStore;
