import fs from 'fs';
import { EventEmitter } from 'events';

class LibraryStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      library: []
    };
  }

  getAll = () => this.state;

  loadLibrary = (directory) => {
    fs.readdir(directory, this.setLibrary);
  };

  setLibrary = (library) => {
    this.state.library = library;
    this.emit('change');
  };

  handleActions = (action) => {
    switch(action.type) {
      case 'LOAD_LIBRARY':
        this.loadLibrary(action.directory);
        break;
    }
  }
}

export default new LibraryStore;
