import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ButtonBar from './ButtonBar';
import headerStyle from './headerStyle';

const HeaderText = () => (
  <Typography variant="title" style={headerStyle}>
    Wonder Reader
  </Typography>
);

const Header = ({ buttons, pageCount, setZoomLevel, zoomLevel }) => (
  <AppBar>
    <Toolbar>
      <HeaderText />
      <ButtonBar
        buttons={buttons}
        pageCount={pageCount}
        setZoomLevel={setZoomLevel}
        zoomLevel={zoomLevel}
      />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  buttons: PropTypes.object.isRequired,
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default Header;
