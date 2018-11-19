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
  state = {loading: LoadingStore.getLoadingState()}

  componentDidMount() {
    LoadingStore.on('change', this.setLoadingState);
    window.addEventListener('keydown', this.windowListenerTurnPage);
  }

  componentWillUnmount() {
    LoadingStore.removeListener('change', this.setLoadingState);
  }

  windowListenerTurnPage = (e) => {
    const shouldTurn = ComicStore.isComicActive() && activeTag !== 'input';
    if (shouldTurn) {
      this.arrowKeyTurnPage(e.code);
    }
  }

  arrowKeyTurnPage = code => {
    if (code === 'ArrowRight') {
      PageActions.turnPageRight();
    } else if (code === 'ArrowLeft') {
      PageActions.turnPageLeft();
    }
  };

  setLoadingState = () => {
    this.setState({
      loading: LoadingStore.getLoadingState()
    });
  }

  throwError = (error, errorMessage) => {
    if (error) {
      this.setState({ error: true, errorMessage }, () => {
        console.log(errorMessage);
        // TODO Spawn error module;
      });
    }
  };

  render() {
    console.log('Main (state):', this.state);
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
