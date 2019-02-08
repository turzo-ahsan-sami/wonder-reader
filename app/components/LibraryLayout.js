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
  constructor(props) {
    super(props);
    this.state = store.content.getAll();
  }

  componentDidMount() {
    store.content.on('change', this.setContentState);
  }

  componentWillUnmount() {
    const { fullPath } = this.state;
    if (fullPath !== null) {
      actions.content.setContent(this.state);
    }
    store.content.removeListener('change', this.setContentState);
  }

  onClick = content => {
    content.isDirectory
      ? actions.content.setContent(content)
      : actions.comic.openComic(content.fullPath);
  };

  openDirectory = () => {
    console.log('openDirectory');
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (filePaths) => {
      console.log(filePaths);
      if (Array.isArray(filePaths)) {
        console.log(filePaths);
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

  render() {
    const { contents, fullPath } = this.state;

    return (
      <div className="library" style={styles}>
        <LibraryHeader
          buttons={<this.renderButtons />}
          position="fixed"
          title="Library"
        />
        {fullPath && (
          <LibraryTable
            contents={contents}
            onContentClick={this.onClick}
          />
        )}
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
