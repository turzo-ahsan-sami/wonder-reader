import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import headerStyle from '../headerStyle';
import { buttonStyle, buttonTheme } from '../buttonStyle';

const Header = ({ children }) => (
  <AppBar style={{ position: 'fixed' }}>
    <Toolbar>
      <Typography variant="title" style={headerStyle}>
        Library
      </Typography>
      <MuiThemeProvider theme={buttonTheme}>
        <div style={buttonStyle}>{children}</div>
      </MuiThemeProvider>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
