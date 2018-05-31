import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ButtonBar from './ButtonBar';
import headerStyle from './headerStyle';

// Insert props to pass onto
const Header = props => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" style={headerStyle}>
        Wonder Reader
      </Typography>
      <ButtonBar
        buttons={props.buttons}
        changePageCount={props.changePageCount}
        pageCount={props.pageCount}
        setZoomLevel={props.setZoomLevel}
        zoomLevel={props.zoomLevel}
      />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  changePageCount: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default Header;
