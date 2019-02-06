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
      name: null,
      basename: '',
      tempdir: '',
      extname: '',
      origin: '',

      pending: 0,
      error: false,
      errorMessage: '',
      stat: ''
    };
  }

  getAll() {
    return this.state;
  }

  isComicActive = () => {
    const { name } = this.state;
    return name !== null;
  };

  openComic = fullpath => {
    loadingActions.enableLoading();
    const Comic = new File(fullpath);
    Comic.extract(this.postComicExtract);
  };

  postComicExtract = comic => {
    if (!comic.error) {
      this.generatePages(comic.tempdir, page => {
        this.setComicState(comic);
        loadingActions.disableLoading();
        PageStore.postGeneratePages(page, comic);
      });
    }
  };

  setComicState = (obj) => {
    this.state = obj;
    this.emit('change');
  }

  handleActions = (action) => {
    switch(action.type) {
      case OPEN_COMIC:
        this.openComic(action.filepath);
        break;
    }
  }
}

const comicStore = new ComicStore;
dispatcher.register(comicStore.handleActions.bind(comicStore));
export default comicStore;
