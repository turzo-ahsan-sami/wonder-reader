import { remote } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { ButtonClose, ButtonLevelUp, ButtonOpenFolder } from './Buttons';
import LibraryHeader from './LibraryHeader';
import LibraryTable from './LibraryTable';

const { dialog } = remote;
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
    const { openComic } = this.props;
    if (content.isDirectory) {
      this.onDirectoryClick(content);
    } else {
      openComic(content.fullpath);
    }
  };

  onDirectoryClick = content => {
    this.updateContent(content.fullpath);
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

  renderButtons = () => {
    const { closeLibrary } = this.props;
    return (
      <div>
        <ButtonOpenFolder onClick={this.openDirectory} />
        <ButtonLevelUp onClick={this.setParentAsLibrary} />
        <ButtonClose onClick={closeLibrary} />
      </div>
    );
  };

  renderLibary = () => {
    const { contents } = this.state;

    return <LibraryTable contents={contents} onContentClick={this.onClick} />;
  };
  render() {
    const { fullpath } = this.state;

    const libraryTable = fullpath ? this.renderLibary() : null;

    return (
      <div className="library" style={styles}>
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
  marginTop: '64px',
  maxHeight: 'calc(90vh - 64px)',
  overflowY: 'auto'
};

export default LibraryLayout;
