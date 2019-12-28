import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import headerStyle from './headerStyle';

const Header = ({ children }) => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" style={headerStyle}>
        Wonder Reader
      </Typography>
      {children}
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  children: PropTypes.node.isRequired
};

export default Header;
