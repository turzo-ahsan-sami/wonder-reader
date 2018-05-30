import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './components/Main';
import './app.global.css';

render(
  <AppContainer>
    <Main />
  </AppContainer>,
  document.getElementById('root')
);
