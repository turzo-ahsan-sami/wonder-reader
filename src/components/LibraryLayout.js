import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { FaClose, FaFolderOpen, FaLevelUp } from 'react-icons/lib/fa';

import LibraryHeader from './LibraryHeader.js';
import LibraryTable from './LibraryTable.js';

// const { comicDirectory } = require('../modules/private.js');
const { copyArray, copyDeepObject } = require('../modules/copyData.js');
const { dialog } = window.require('electron').remote;
const { generateNestedContentFromFilepath } = require('../modules/generate.js');

const id = 'libraryRoot';

export default class LibraryLayout extends Component {
  state = {
    id: id,
    basename: '',
    bookmark: '',
    dirname: '',
    fullpath: null,
    isDirectory: true,
    root: '',
    contents: []
  };

  componentWillUnmount() {
    this.props.saveContentDataToParent(this.state);
  }

  generateButtons = () => {
    return(
      <div>
        <IconButton
          onClick={this.openDirectory}
          color='primary'>
          <FaFolderOpen />
        </IconButton>
        <IconButton
          onClick={this.setParentAsLibrary}
          color='primary'>
          <FaLevelUp />
        </IconButton>
        <IconButton
          onClick={this.props.closeLibrary}
          color='primary'
          style={{
            background: '#ef5350'}}>
          <FaClose />
        </IconButton>
      </div>
    );
  }

  onClick = (content) => {
    if (content.isDirectory) {
      this.onDirectoryClick(content);
    } else {
      this.onFileClick(content);
    }
  }

  onDirectoryClick = (content) => {
    this.updateContent(content.fullpath);
  }

  onFileClick = (content) => {
    this.props.openComic(content.fullpath);
  }

  // Function to open `Load` window, and pass path to generateContent, then setstate
  openDirectory = () => {
    dialog.showOpenDialog({properties: ['openDirectory']},
      (filepaths) => {
        if (Array.isArray(filepaths)) {
          const filepath = filepaths[0];
          this.props.updateRoot(filepath);
          this.updateContent(filepath);
        }
      }
    );
  }

  saveContentDataToParent = (content) => {
    const newContent = copyDeepObject(content);
    this.setState(newContent);
  }

  saveContentsDataToParent = (contents) => {
    const newContent = copyDeepObject(this.state);
    newContent.contents = contents;
    this.setState({contents: newContent});
  }

  setParentAsLibrary = () => {
    this.updateContent(this.state.dirname);
  }

  sortContents = (contents) => {
    if (!contents) { return []; }
    const sortedContent = copyArray(contents);
    sortedContent.sort((a, b) => {
      const nameA = a.basename.toLowerCase();
      const nameB = b.basename.toLowerCase();
      return nameA === nameB
        ? 0
        : nameA < nameB ? -1 : 1;
    });
    return sortedContent;
  }

  updateContent = (fullpath) => {
    generateNestedContentFromFilepath(fullpath, (newContent) => {
      newContent.id = id;
      this.setState(newContent);
    });
  }

  render() {
    const content = this.state;
    const libraryTable = content.fullpath ?
      (
        <LibraryTable
          key={content.id}
          basename={content.basename}
          bookmark={content.bookmark}
          dirname={content.dirname}
          fullpath={content.fullpath}
          isDirectory={true}
          contents={content.contents}

          onContentClick={this.onClick}

          showRowHover={true}

          saveContentDataToParent={this.saveContentDataToParent}
          saveContentsDataToParent={this.saveContentsDataToParent}/>
      ) : null;
    return(
      <div
        className='library'
        style={{
          marginTop: '64px',
          maxHeight: 'calc(90vh - 64px)',
          overflowY: 'auto'}}>
        <LibraryHeader
          position='fixed'
          title='Library'
          buttons={this.generateButtons()}
          onContentClick={this.onClick}/>
        {libraryTable}
      </div>
    );
  }
}
