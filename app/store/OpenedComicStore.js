import { EventEmitter } from 'events';

class OpenedComicStore extends EventEmitter {
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

  updateOpenedComic(obj) {
    this.state = obj;
    this.emit('change');
  }
}

const openedComicStore = new OpenedComicStore;

export default openedComicStore;
