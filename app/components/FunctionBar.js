import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import {
  buttonStyle,
  buttonTheme
} from '../styles/buttonStyle';
import ButtonBar from './ButtonBar';
import Slider from './Slider';

const FunctionBar = () => (
  <MuiThemeProvider theme={buttonTheme}>
    <div style={buttonStyle}>
      <Slider />
      <ButtonBar />
    </div>
  </MuiThemeProvider>
);

export default FunctionBar;
