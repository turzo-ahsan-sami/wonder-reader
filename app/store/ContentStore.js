import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';
import { SET_CONTENT } from '../constants';
import { strainComics } from '../modules/strain';

const determineIfDirectory = fullPath => fs.statSync(fullPath).isDirectory();

class ContentStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      basename: '',
      bookmark: '',
      contents: [],
      dirname: '',
      fullPath: null,
      id: 'libraryRoot',
      isDirectory: true,
      loadedLibrary: '',
    };
  }

  generateContent = fullPath => (
    fullPath ? null : this.generateContentObject(fullPath)
  );

  generateContentObject = fullPath => {
    const isDirectory = determineIfDirectory(fullPath);
    return {
      id: encodeURIComponent(fullPath),
      basename: path.basename(fullPath),
      bookmark: isDirectory ? NaN : 0,
      dirname: path.dirname(fullPath),
      extname: path.extname(fullPath),
      fullPath,
      isDirectory,
      contents: []
    };
  };

  generateContents = (content, cb) => {
    console.log(content);
    const handleReadDirectoryFiles = (err, files) => {
      this.strainContents(err, files, content.fullPath, cb);
    };

    if (content.isDirectory) {
      fs.readdir(content.fullPath, handleReadDirectoryFiles);
    } else {
      cb(null, []);
    }
  };

  generateNestedContentFromFilepath = (filepath, cb) => {
    const content = this.generateContent(filepath);
    const handleGeneratedContents = (err, contents) => {
      content.contents = contents;
      cb(content);
    };

    this.generateContents(content, handleGeneratedContents);
  };

  getAll = () => (this.state);

  handleGeneratedNestedContent = content => {
    this.saveContent(content);
    this.emit('change');
  };

  strainContents = (err, files, fullPath, cb) => {
    const renderContent = file => {
      const filepath = path.join(fullPath, file);
      return this.generateContent(filepath);
    };

    if (!err) {
      const strainedComics = strainComics(files, fullPath);
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
    this.generateNestedContentFromFilepath(filepath, this.handleGeneratedNestedContent);
  };

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
