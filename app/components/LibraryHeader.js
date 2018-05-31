import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { buttonStyle, buttonTheme } from './buttonStyle';
import headerStyle from './headerStyle';

const LibraryHeader = props => (
  <AppBar style={{ position: props.position }}>
    <Toolbar>
      <Typography variant="title" style={headerStyle}>
        {props.title}
      </Typography>
      <MuiThemeProvider theme={buttonTheme}>
        <div style={buttonStyle}>{props.buttons}</div>
      </MuiThemeProvider>
    </Toolbar>
  </AppBar>
);

LibraryHeader.propTypes = {
  buttons: PropTypes.object.isRequired, // eslint-disable-line
  position: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default LibraryHeader;
