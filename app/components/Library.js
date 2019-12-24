import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import LibraryLayout from './LibraryLayout';

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  PaperProps: {
    borderRadius: '0px 0px 0px 15px',
    margin: 'auto',
    maxWidth: '960px'
  }
};

class Library extends Component {
  state = {
    root: this.props.loadedLibrary
  };

  updateRoot = filepath => {
    this.setState({ root: filepath });
  };

  renderDrawer = () => {
    const { closeDrawer, open } = this.props;

    return (
      <Drawer
        anchor="top"
        open={open}
        onClose={closeDrawer}
        PaperProps={{ style: styles.PaperProps }}
        variant="temporary"
        transitionDuration={125}
      >
        <div tabIndex={0} role="button" onKeyDown={closeDrawer}>
          {this.renderLibraryLayout()}
        </div>
      </Drawer>
    );
  };

  renderLibraryLayout = () => {
    const {
      classes,
      closeDrawer,
      openComic,
      saveContentDataToMain
    } = this.props;
    const { root } = this.state;

    return (
      <LibraryLayout
        className={classes.list}
        closeLibrary={closeDrawer}
        openComic={openComic}
        root={root}
        saveContentDataToParent={saveContentDataToMain}
        updateRoot={this.updateRoot}
      />
    );
  };

  render() {
    const { style } = this.props;

    return (
      <div className="Library" style={style}>
        {this.renderDrawer()}
      </div>
    );
  }
}

Library.defaultProps = {
  loadedLibrary: null,
  style: {}
};

Library.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  closeDrawer: PropTypes.func.isRequired,
  loadedLibrary: PropTypes.string,
  open: PropTypes.bool.isRequired,
  openComic: PropTypes.func.isRequired,
  saveContentDataToMain: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.object.isRequired)
};

export default withStyles(styles)(Library);
