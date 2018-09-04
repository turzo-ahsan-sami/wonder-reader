import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import FunctionBar from './FunctionBar';
import headerStyle from './headerStyle';

const HeaderText = () => (
  <Typography variant="title" style={headerStyle}>
    Wonder Reader
  </Typography>
);

const Header = ({ ButtonFunctions, pageCount, setZoomLevel, zoomLevel }) => (
  <AppBar>
    <Toolbar>
      <HeaderText />
      <FunctionBar
        ButtonFunctions={ButtonFunctions}
        pageCount={pageCount}
        setZoomLevel={setZoomLevel}
        zoomLevel={zoomLevel}
      />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  ButtonFunctions: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default Header;
