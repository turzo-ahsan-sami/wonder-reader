import { remote } from 'electron';
import React, { Component } from 'react';

import {
  ButtonClose,
  ButtonLevelUp,
  ButtonOpenFolder
} from './Buttons';
import LibraryHeader from './LibraryHeader';
import LibraryTable from './LibraryTable';

import * as ComicActions from '../actions/comicActions';
import * as ContentActions from '../actions/contentActions';
import * as TopActions from '../actions/topActions';
import ContentStore from '../store/ContentStore';

const { dialog } = remote;

class LibraryLayout extends Component {
  state = ContentStore.getAll();

  componentDidMount() {
    ContentStore.on('change', this.setContentState);
  }

  componentWillUnmount() {
    ContentActions.setContent(this.state);
    ContentStore.removeListener('change', this.setContentState);
  }

  onClick = content => {
    content.isDirectory
      ? ContentActions.setContent(content)
      : ComicActions.openComic(content.fullpath);
  };

  openDirectory = () => {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (filepaths) => {
      if (Array.isArray(filepaths)) {
        ContentActions.setContent(filepaths[0]);
      }
    });
  };

  setContentState = () => {
    const {
      basename,
      bookmark,
      contents,
      dirname,
      fullpath,
      id,
      isDirectory,
      loadedLibrary
    } = ContentStore.getAll();
    this.setState({
      basename,
      bookmark,
      contents,
      dirname,
      fullpath,
      id,
      isDirectory,
      loadedLibrary
    });
  }

  setParentAsLibrary = () => {
    const { dirname } = this.state;
    ContentActions.setContent(dirname);
  };

  renderButtons = () =>  (
    <div>
      <ButtonOpenFolder onClick={this.openDirectory} />
      <ButtonLevelUp onClick={this.setParentAsLibrary} />
      <ButtonClose onClick={TopActions.closeLibrary} />
    </div>
  );


  renderHeader = () => (
    <LibraryHeader
      position="fixed"
      title="Library"
      buttons={this.renderButtons()}
      onContentClick={this.onClick}
    />
  )

  renderLibary = () => (
    this.state.fullpath ? (
      <LibraryTable
        contents={this.state.contents}
        onContentClick={this.onClick}
      />
    ) : null
  );

  render() {
    return (
      <div className="library" style={styles}>
        {this.renderHeader()}
        {this.renderLibary()}
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
