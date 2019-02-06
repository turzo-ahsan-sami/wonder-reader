import PropTypes from 'prop-types';
import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { buttonStyle, buttonTheme } from '../styles/buttonStyle';
import headerStyle from '../styles/headerStyle';

const LibraryButtons = ({ children }) => (
  <MuiThemeProvider theme={buttonTheme}>
    <div style={buttonStyle}>
      {children}
    </div>
  </MuiThemeProvider>
);

LibraryButtons.propTypes = {
  children: PropTypes.object.isRequired
};

const LibraryTitle = ({ title }) => (
  <Typography
    style={headerStyle}
    variant="title"
  >
    {title}
  </Typography>
);

LibraryTitle.propTypes = {
  title: PropTypes.string.isRequired
};

const LibraryHeader = ({
  buttons,
  position,
  title
}) => (
  <AppBar style={{ position }}>
    <Toolbar>
      <LibraryTitle title={title} />
      <LibraryButtons>
        {buttons}
      </LibraryButtons>
    </Toolbar>
  </AppBar>
);

LibraryHeader.propTypes = {
  buttons: PropTypes.element.isRequired,
  position: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default LibraryHeader;
