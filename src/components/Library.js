import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import LibraryLayout from './LibraryLayout.js';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class Library extends Component {
  state = {
    root: null,
  }

  updateRoot = (filepath) => {
    this.setState({root: filepath});
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        className="Library"
        style={this.props.style}>
        <Drawer
          anchor="top"
          open={this.props.open}
          onClose={this.props.closeDrawer}
          PaperProps={{style: {
            borderRadius: '0px 0px 0px 15px',
            margin: 'auto',
            maxWidth: '960px',
          }}}
          variant='temporary'
          transitionDuration={125}>
          <div
            tabIndex={0}
            role="button"
            onKeyDown={this.props.closeDrawer}>
            <LibraryLayout
              className={classes.list}
              closeLibrary={this.props.closeDrawer}
              openComic={this.props.openComic}
              root={this.state.root}
              saveContentDataToParent={this.props.saveContentDataToMain}
              updateRoot={this.updateRoot}/>
          </div>
        </Drawer>
      </div>
    );
  }
}

Library.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Library);
