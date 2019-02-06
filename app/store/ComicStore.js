import { EventEmitter } from 'events';

import { OPEN_COMIC } from '../constants';
import dispatcher from '../dispatcher';
import PageStore from './PageStore';
import * as loadingActions from '../actions/loadingActions';
import File from '../modules/File';

class ComicStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      basename: '',
      extname: '',
      name: null,
      origin: '',
      tempDirectory: '',

      pending: 0,
      error: false,
      errorMessage: '',
      stat: ''
    };
  }

  getAll = () => this.state;

  isComicActive = () => {
    const { name } = this.state;
    return name !== null;
  };

  openComic = fullPath => {
    loadingActions.enableLoading();
    const Comic = new File(fullPath);
    Comic.extract(this.handleExtractedComic);
  };

  handleExtractedComic = comic => {
    const handleGeneratedPage = this.handleGeneratedComic(comic);

    if (!comic.error) {
      PageStore.generatePages(comic.tempDirectory, handleGeneratedPage);
    }
  };

  handleGeneratedComic = comic => (
    (pages) => {
      this.setComicState(comic);
      loadingActions.disableLoading();
      PageStore.handleGeneratedPages(pages, comic);
    }
  );

  setComicState = (obj) => {
    this.state = obj;
    this.emit('change');
  };

  handleActions = (action) => {
    switch(action.type) {
      case OPEN_COMIC:
        this.openComic(action.filepath);
        break;
    }
  };
}

const comicStore = new ComicStore;
dispatcher.register(comicStore.handleActions.bind(comicStore));
export default comicStore;
