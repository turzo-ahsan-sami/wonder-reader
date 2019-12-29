import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaClose, FaFolderOpen, FaLevelUp } from 'react-icons/lib/fa';

import LibraryHeader from './LibraryHeader';
import LibraryTable from './LibraryTable';

const { copyDeepObject } = require('../modules/copyData.js');
const { dialog } = require('electron').remote;
const { generateNestedContentFromFilepath } = require('../modules/generate.js');

const styles = {
  closeButton: {
    background: '#ef5350'
  },
  libraryStyles: {
    marginTop: '64px',
    maxHeight: 'calc(90vh - 64px)',
    overflowY: 'auto'
  }
};

class LibraryLayout extends Component {
  state = {
    id: 'libraryRoot',
    basename: '',
    bookmark: '',
    dirname: '',
    fullpath: null,
    isDirectory: true,
    root: '',
    contents: []
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

  renderButtons = () => (
    <div>
      {this.renderFolderOpen()}
      {this.renderLevelUp()}
      {this.renderClose()}
    </div>
  );

  renderClose = () => (
    <IconButton
      onClick={this.props.closeLibrary}
      color="primary"
      style={styles.closeButton}
    >
      <FaClose />
    </IconButton>
  );

  renderFolderOpen = () => (
    <IconButton onClick={this.openDirectory} color="primary">
      <FaFolderOpen />
    </IconButton>
  );

  renderLevelUp = () => (
    <IconButton onClick={this.setParentAsLibrary} color="primary">
      <FaLevelUp />
    </IconButton>
  );

  renderLibary = () => {
    const { basename, bookmark, contents, dirname, fullpath, id } = this.state;

    return (
      <LibraryTable
        key={id}
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
    );
  };

  onClick = content => {
    if (content.isDirectory) {
      this.onDirectoryClick(content);
    } else {
      this.onFileClick(content);
    }
  };

  onDirectoryClick = content => {
    this.updateContent(content.fullpath);
  };

  onFileClick = content => {
    this.props.openComic(content.fullpath);
  };

  // Function to open `Load` window, and pass path to generateContent, then setstate
  openDirectory = () => {
    const { updateRoot } = this.props;
    dialog.showOpenDialog(
      {
        properties: ['openDirectory']
      },
      filepaths => {
        if (Array.isArray(filepaths)) {
          const filepath = filepaths[0];
          updateRoot(filepath);
          this.updateContent(filepath);
        }
      }
    );
  };

  saveContentDataToParent = content => {
    const newContent = copyDeepObject(content);
    this.setState(newContent);
  };

  saveContentsDataToParent = contents => {
    const newContent = copyDeepObject(this.state);
    newContent.contents = contents;
    this.setState({ contents: newContent });
  };

  setParentAsLibrary = () => {
    const { dirname } = this.state;
    this.updateContent(dirname);
  };

  updateContent = fullpath => {
    generateNestedContentFromFilepath(fullpath, content => {
      const newContent = content;
      newContent.id = 'libraryRoot';
      this.setState(newContent);
    });
  };

  render() {
    const { fullpath } = this.state;

    const libraryTable = fullpath ? this.renderLibary() : null;
    return (
      <div className="library" style={styles.libraryStyles}>
        <LibraryHeader
          position="fixed"
          title="Library"
          buttons={this.renderButtons()}
          onContentClick={this.onClick}
        />
        {libraryTable}
      </div>
    );
  }
}

LibraryLayout.defaultProps = {
  root: null
};

LibraryLayout.propTypes = {
  closeLibrary: PropTypes.func.isRequired,
  openComic: PropTypes.func.isRequired,
  root: PropTypes.string,
  saveContentDataToParent: PropTypes.func.isRequired,
  updateRoot: PropTypes.func.isRequired
};

export default LibraryLayout;
