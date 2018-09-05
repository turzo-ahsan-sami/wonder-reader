import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import { buttonStyle, buttonTheme } from '../styles/buttonStyle';
import headerStyle from '../styles/headerStyle';

const LibraryButtons = ({ buttons }) => (
  <MuiThemeProvider theme={buttonTheme}>
    <div style={buttonStyle}>{buttons}</div>
  </MuiThemeProvider>
);

LibraryButtons.propTypes = {
  buttons: PropTypes.object.isRequired
};

const LibraryTitle = ({ title }) => (
  <Typography variant="title" style={headerStyle}>
    {title}
  </Typography>
);

LibraryTitle.propTypes = {
  title: PropTypes.string.isRequired
};

const LibraryHeader = ({ buttons, position, title }) => (
  <AppBar style={{ position }}>
    <Toolbar>
      <LibraryTitle title={title} />
      <LibraryButtons buttons={buttons} />
    </Toolbar>
  </AppBar>
);

LibraryHeader.propTypes = {
  buttons: PropTypes.object.isRequired,
  position: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default LibraryHeader;
