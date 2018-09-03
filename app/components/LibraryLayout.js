import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { FaClose, FaFolderOpen, FaLevelUp } from 'react-icons/lib/fa';
import PropTypes from 'prop-types';

import LibraryHeader from './LibraryHeader';
import LibraryTable from './LibraryTable';

const { dialog } = require('electron').remote;
const { generateNestedContentFromFilepath } = require('../modules/generate.js');

class LibraryLayout extends Component {
  state = {
    id: 'libraryRoot',
    basename: '',
    bookmark: '',
    dirname: '',
    fullpath: null,
    isDirectory: true,
    loadedLibrary: '',
    contents: []
  };

  componentDidMount() {
    const { loadedLibrary } = this.props;
    if (loadedLibrary) {
      this.updateContent(loadedLibrary);
    }
  }

  componentWillUnmount() {
    this.props.saveContentDataToParent(this.state);
  }

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

  setParentAsLibrary = () => {
    const { dirname } = this.state;
    this.updateContent(dirname);
  };

  openDirectory = () => {
    const { updateLoadedLibrary } = this.props;
    dialog.showOpenDialog({ properties: ['openDirectory'] }, filepaths => {
      if (Array.isArray(filepaths)) {
        const filepath = filepaths[0];
        updateLoadedLibrary(filepath);
        this.updateContent(filepath);
      }
    });
  };

  updateContent = path => {
    generateNestedContentFromFilepath(path, content => {
      this.setState(content);
    });
  };

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
    const { contents } = this.state;

    return <LibraryTable contents={contents} onContentClick={this.onClick} />;
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
  loadedLibrary: null
};

LibraryLayout.propTypes = {
  closeLibrary: PropTypes.func.isRequired,
  loadedLibrary: PropTypes.string,
  openComic: PropTypes.func.isRequired,
  saveContentDataToParent: PropTypes.func.isRequired,
  updateLoadedLibrary: PropTypes.func.isRequired
};

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

export default LibraryLayout;
