import { EventEmitter } from 'events';
import path from 'path';

import encodepath from '../modules/encodepath';

const sizeOf = require('image-size');

class OpenedComicStore extends EventEmitter {
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

  generateEncodedPage = (key, bool, encodedPages) => {
    const openedComic = OpenedComicStore.getAll();
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
        encodedPages[i] = this.generateEncodedPage(key, bool, encodedPages);
      }
    }

    return encodedPages;
  };

  getAll() {
    return this.state;
  }

  updateStore(obj) {
    this.state = obj;
    this.emit('change');
  }

  updateProp(prop, value) {
    this.state[prop] = value;
    this.emit('change');
  }
}

const openedComicStore = new OpenedComicStore;

export default openedComicStore;
