import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { buttonStyle, buttonTheme } from './buttonStyle.js';
import { headerStyle } from './headerStyle.js';

const LibraryHeader = (props) => {
  return (
    <AppBar style={{position: props.position}}>
      <Toolbar>
        <Typography
          variant="title"
          style={headerStyle}>
          {props.title}
        </Typography>
        <MuiThemeProvider theme={buttonTheme}>
          <div style={buttonStyle}>
            {props.buttons}
          </div>
        </MuiThemeProvider>
      </Toolbar>
    </AppBar>
  );
};

export default LibraryHeader;
