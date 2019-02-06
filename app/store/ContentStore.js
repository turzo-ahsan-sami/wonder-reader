import { EventEmitter } from 'events';
import fs from 'fs';
import path from 'path';

import { SET_CONTENT } from '../constants';
import dispatcher from '../dispatcher';
import { strainComics } from '../modules/strain';

const determineIfDirectory = fullpath => fs.statSync(fullpath).isDirectory();

class ContentStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      basename: '',
      bookmark: '',
      contents: [],
      dirname: '',
      fullpath: null,
      id: 'libraryRoot',
      isDirectory: true,
      loadedLibrary: '',
    };
  }

  generateContent = fullpath =>
    fullpath ? null : this.generateContentObject(fullpath);

  generateContentObject = fullpath => {
    const isDirectory = determineIfDirectory(fullpath);
    return {
      id: encodeURIComponent(fullpath),
      basename: path.basename(fullpath),
      bookmark: isDirectory ? NaN : 0,
      dirname: path.dirname(fullpath),
      extname: path.extname(fullpath),
      fullpath,
      isDirectory,
      contents: []
    };
  };

  generateContents = (content, cb) => {
    console.log(content);
    if (content.isDirectory) {
      fs.readdir(content.fullpath, (err, files) => {
        this.strainContents(err, files, content.fullpath, cb);
      });
    } else {
      cb(null, []);
    }
  };

  generateNestedContentFromFilepath = (filepath, cb) => {
    const content = this.generateContent(filepath);
    this.generateContents(content, (err, contents) => {
      content.contents = contents;
      cb(content);
    });
  };

  getAll = () => (this.state);

  strainContents = (err, files, fullpath, cb) => {
    const renderContent = file => {
      const filepath = path.join(fullpath, file);
      return this.generateContent(filepath);
    };

    if (!err) {
      const strainedComics = strainComics(files, fullpath);
      const contents = strainedComics.map(renderContent);
      cb(err, contents);
    } else {
      cb(null, []);
    }
  };

  saveContent = (content) => {
    this.state.content = content;
  };

  setContent = (filepath) => {
    this.generateNestedContentFromFilepath(filepath, content => {
      this.saveContent(content);
      this.emit('change');
    });
  }

  handleActions = (action) => {
    switch (action.type) {
      case SET_CONTENT:
        this.setContent(action.content);
        break;
    }
  }
}

const contentStore = new ContentStore;
dispatcher.register(contentStore.handleActions.bind(contentStore));
export default contentStore;
