import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ButtonBar from './ButtonBar.js';
import {headerStyle} from './headerStyle.js';
import 'typeface-carter-one';

// Insert props to pass onto
const Header = (props) => {
  // console.log('Header props: ', props);
  return (
    <AppBar>
      <Toolbar>
        <Typography
          variant="title"
          style={headerStyle}>
          Wonder Reader
        </Typography>
        <ButtonBar
          buttons={props.buttons}
          changePageCount={props.changePageCount}
          pageCount={props.pageCount}
          setZoomLevel={props.setZoomLevel}
          zoomLevel={props.zoomLevel}/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
