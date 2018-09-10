import {EventEmitter} from 'events';

class LibraryStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      library: null
    };
  }

  getAll() {
    return this.state;
  }

  setLibrary = (library) => {
    this.state.library = library;
    this.emit('change');
  }
}

export default new LibraryStore;
