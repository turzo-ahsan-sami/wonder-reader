import React, { Component } from 'react';
import { remote } from 'electron';

import {
  ButtonClose,
  ButtonLevelUp,
  ButtonOpenFolder
} from './Buttons';
import LibraryHeader from './LibraryHeader';
import LibraryTable from './LibraryTable';

import * as actions from '../actions';
import * as store from '../store';

const { dialog } = remote;

class LibraryLayout extends Component {
  state = store.content.getAll();

  componentDidMount() {
    store.content.on('change', this.setContentState);
  }

  componentWillUnmount() {
    actions.content.setContent(this.state);
    store.content.removeListener('change', this.setContentState);
  }

  onClick = content => {
    content.isDirectory
      ? actions.content.setContent(content)
      : actions.comic.openComic(content.fullPath);
  };

  openDirectory = () => {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (filePaths) => {
      if (Array.isArray(filePaths)) {
        actions.content.setContent(filePaths[0]);
      }
    });
  };

  setContentState = () => {
    const {
      basename,
      bookmark,
      contents,
      dirname,
      fullPath,
      id,
      isDirectory,
      loadedLibrary
    } = store.content.getAll();
    this.setState({
      basename,
      bookmark,
      contents,
      dirname,
      fullPath,
      id,
      isDirectory,
      loadedLibrary
    });
  };

  setParentAsLibrary = () => {
    const { dirname } = this.state;
    actions.content.setContent(dirname);
  };

  renderButtons = () =>  (
    <div>
      <ButtonOpenFolder onClick={this.openDirectory} />
      <ButtonLevelUp onClick={this.setParentAsLibrary} />
      <ButtonClose onClick={actions.top.closeLibrary} />
    </div>
  );

  renderHeader = () => (
    <LibraryHeader
      buttons={this.renderButtons()}
      onContentClick={this.onClick}
      position="fixed"
      title="Library"
    />
  );

  renderLibrary = () => {
    const {fullPath} = this.state;
    return fullPath
      ? this.renderLibraryTable()
      : null;
  };

  renderLibraryTable = () => {
    const {contents} = this.state;
    return (
      <LibraryTable
        contents={contents}
        onContentClick={this.onClick}
      />
    );
  };

  render() {
    return (
      <div className="library" style={styles}>
        {this.renderHeader()}
        {this.renderLibrary()}
      </div>
    );
  }
}

const styles = {
  marginTop: '64px',
  maxHeight: 'calc(90vh - 64px)',
  overflowY: 'auto'
};

export default LibraryLayout;
