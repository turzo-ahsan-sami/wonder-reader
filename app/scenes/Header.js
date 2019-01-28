import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import FunctionBar from '../components/FunctionBar';
import headerStyle from '../styles/headerStyle';

const HeaderText = () => (
  <Typography
    style={headerStyle}
    variant="title"
  >
    Wonder Reader
  </Typography>
);

const Header = () => (
  <AppBar>
    <Toolbar>
      <HeaderText />
      <FunctionBar />
    </Toolbar>
  </AppBar>
);

export default Header;
