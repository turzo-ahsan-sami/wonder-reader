import React, { useEffect, useState } from 'react';
import { remote } from 'electron';

import * as Button from './Buttons';
import LibraryHeader from './LibraryHeader';
import LibraryTable from './LibraryTable';

import * as actions from '../actions';
import * as store from '../store';

const { dialog } = remote;

const LibraryLayout = () => {
  const [state, setState] = useState(store.content.getAll());

  const updateState = () => {
    setState(store.content.getAll());
  };

  useEffect(() => {
    store.content.on('change', updateState);
    return () => {
      if (state.fullPath !== null) {
        actions.content.setContent(this.state);
      }
      store.content.removeListener('change', updateState);
    };
  });

  const handleFilePaths = filePaths => {
    if (Array.isArray(filePaths)) {
      actions.content.setContent(filePaths[0]);
    }
  };

  const onContentClick = content => {
    content.isDirectory
      ? actions.content.setContent(content)
      : actions.comic.openComic(content.fullPath);
  };

  const openDirectory = () => {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, handleFilePaths);
  };

  return (
    <div className="library" style={styles}>
      <LibraryHeader
        buttons={(
          <div>
            <Button.OpenFolder onClick={openDirectory} />
            <Button.LevelUp onClick={() => actions.content.setContent(state.dirname)} />
            <Button.Close onClick={actions.top.closeLibrary} />
          </div>
        )}
        position="fixed"
        title="Library"
      />
      {state.fullPath && (
        <LibraryTable
          contents={state.contents}
          onContentClick={onContentClick}
        />
      )}
    </div>
  );
};

const styles = {
  marginTop: '64px',
  maxHeight: 'calc(90vh - 64px)',
  overflowY: 'auto'
};

export default LibraryLayout;
