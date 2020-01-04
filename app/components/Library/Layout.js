import PropTypes from 'prop-types';
import React, { Component } from 'react';
import electron from 'electron';

import * as IconButtons from './Icons';
import Header from './Header';
import Table from './Table/Table';

const { copyDeepObject } = require('../../modules/copyData.js');
const {
  generateNestedContentFromFilepath,
} = require('../../modules/generate.js');

const { dialog } = electron.remote ? electron.remote : electron;

const styles = {
  marginTop: '64px',
  maxHeight: 'calc(90vh - 64px)',
  overflowY: 'auto',
};

class Layout extends Component {
  state = {
    basename: '',
    bookmark: '',
    contents: [],
    dirname: '',
    fullpath: null,
    isDirectory: true,
    root: '',
  };

  componentDidMount() {
    const { root } = this.props;
    if (root) {
      this.updateContent(root);
    }
  }

  componentWillUnmount() {
    this.props.saveContentDataToParent(this.state);
  }

  onClick = (content) => {
    if (content.isDirectory) {
      this.onDirectoryClick(content);
    } else {
      this.onFileClick(content);
    }
  };

  onDirectoryClick = (content) => {
    this.updateContent(content.fullpath);
  };

  onFileClick = (content) => {
    this.props.openComic(content.fullpath);
  };

  // Function to open `Load` window, and pass path to generateContent, then setstate
  openDirectory = () => {
    const { updateRoot } = this.props;
    dialog.showOpenDialog(
      {
        properties: ['openDirectory'],
      },
      (filepaths) => {
        if (Array.isArray(filepaths)) {
          const filepath = filepaths[0];
          updateRoot(filepath);
          this.updateContent(filepath);
        }
      },
    );
  };

  saveContentDataToParent = (content) => {
    const newContent = copyDeepObject(content);
    this.setState(newContent);
  };

  saveContentsDataToParent = (contents) => {
    const newContent = copyDeepObject(this.state);
    newContent.contents = contents;
    this.setState({ contents: newContent });
  };

  setParentAsLibrary = () => {
    const { dirname } = this.state;
    this.updateContent(dirname);
  };

  updateContent = (fullpath) => {
    generateNestedContentFromFilepath(fullpath, (content) => {
      const newContent = content;
      newContent.id = 'libraryRoot';
      this.setState(newContent);
    });
  };

  render() {
    const { basename, bookmark, contents, dirname, fullpath } = this.state;

    return (
      <div className="library" style={styles}>
        <Header>
          <IconButtons.FolderOpen onClick={this.openDirectory} />
          <IconButtons.LevelUp onClick={this.setParentAsLibrary} />
          <IconButtons.Close onClick={this.props.closeLibrary} />
        </Header>
        {fullpath && (
          <Table
            key="libraryRoot"
            basename={basename}
            bookmark={bookmark}
            dirname={dirname}
            fullpath={fullpath}
            isDirectory
            contents={contents}
            onContentClick={this.onClick}
            saveContentDataToParent={this.saveContentDataToParent}
            saveContentsDataToParent={this.saveContentsDataToParent}
          />
        )}
      </div>
    );
  }
}

Layout.defaultProps = {
  root: null,
};

Layout.propTypes = {
  closeLibrary: PropTypes.func.isRequired,
  openComic: PropTypes.func.isRequired,
  root: PropTypes.string,
  saveContentDataToParent: PropTypes.func.isRequired,
  updateRoot: PropTypes.func.isRequired,
};

export default Layout;
