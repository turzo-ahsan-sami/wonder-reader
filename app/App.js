import React, { useEffect, useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import * as actions from './actions';
import * as store from './store';

import Header from './scenes/Header';
import Library from './scenes/Library';
import Loading from './scenes/Loading';
import PageViewer from './scenes/PageViewer';

import theme from './styles/theme';

const handleKeyCode = code => {
  switch (code) {
    case 'ArrowRight':
      actions.page.turnPageRight();
      break;
    case 'ArrowLeft':
      actions.page.turnPageLeft();
      break;
  }
};

const handleKeyDown = (e) => {
  const activeTag = document.activeElement.tagName;
  const shouldTurn = store.comic.isComicActive() && activeTag !== 'input';
  if (shouldTurn) {
    handleKeyCode(e.code);
  }
};

const App = () => {
  const [loading, setLoadingState] = useState(store.loading.getLoadingState());

  const updateLoadingState = () => {
    setLoadingState(store.loading.getLoadingState());
  };

  useEffect(() => {
    store.loading.on('change', updateLoadingState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      store.loading.removeListener('change', updateLoadingState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <MuiThemeProvider theme={theme}>
      <div className="main">
        <Header />
        <Library />
        <PageViewer />
        <Loading loading={loading} />
      </div>
    </MuiThemeProvider>
  );
};

export default App;
