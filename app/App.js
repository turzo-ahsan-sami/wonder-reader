import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';

import * as PageActions from './actions/pageActions';

import Header from './scenes/Header';
import Library from './scenes/Library';
import Loading from './scenes/Loading';
import PageViewer from './scenes/PageViewer';

import ComicStore from './store/ComicStore';
import LoadingStore from './store/LoadingStore';

import theme from './styles/theme';

const activeTag = document.activeElement.tagName;

export default class App extends Component {
  state = {
    loading: LoadingStore.getLoadingState()
  };

  componentDidMount() {
    LoadingStore.on('change', this.setLoadingState);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    LoadingStore.removeListener('change', this.setLoadingState);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyCode = code => {
    switch (code) {
      case 'ArrowRight':
        PageActions.turnPageRight();
        break;
      case 'ArrowLeft':
        PageActions.turnPageLeft();
        break;
    }
  };

  handleKeyDown = (e) => {
    const shouldTurn = ComicStore.isComicActive() && activeTag !== 'input';
    if (shouldTurn) {
      this.handleKeyCode(e.code);
    }
  };

  setLoadingState = () => {
    this.setState({
      loading: LoadingStore.getLoadingState()
    });
  };

  throwError = (error, errorMessage) => {
    if (error) {
      this.setState({ error: true, errorMessage }, () => {
        console.log(errorMessage);
        // TODO Spawn error module;
      });
    }
  };

  render() {
    const { loading } = this.state;

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
  }
}
