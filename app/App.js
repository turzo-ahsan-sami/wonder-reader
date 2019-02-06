import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';

import * as actions from './actions';
import * as store from './store';

import Header from './scenes/Header';
import Library from './scenes/Library';
import Loading from './scenes/Loading';
import PageViewer from './scenes/PageViewer';

import theme from './styles/theme';

const activeTag = document.activeElement.tagName;

export default class App extends Component {
  state = {
    loading: store.loading.getLoadingState()
  };

  componentDidMount() {
    store.loading.on('change', this.setLoadingState);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    store.loading.removeListener('change', this.setLoadingState);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyCode = code => {
    switch (code) {
      case 'ArrowRight':
        actions.page.turnPageRight();
        break;
      case 'ArrowLeft':
        actions.page.turnPageLeft();
        break;
    }
  };

  handleKeyDown = (e) => {
    const shouldTurn = store.comic.isComicActive() && activeTag !== 'input';
    if (shouldTurn) {
      this.handleKeyCode(e.code);
    }
  };

  setLoadingState = () => {
    this.setState({
      loading: store.loading.getLoadingState()
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
