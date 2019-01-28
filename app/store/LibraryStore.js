import {EventEmitter} from 'events';
import fs from 'fs';

class LibraryStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      library: []
    };
  }

  getAll = () => (this.state);

  loadLibrary = (directory) => {
    fs.readdir(directory, (files) => {
      this.setLibrary(files);
    });
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
