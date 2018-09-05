import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import LibraryLayout from '../components/LibraryLayout';

import TopStore from '../store/TopStore';

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
    loadedLibrary: this.props.loadedLibrary,
    top: TopStore.getTopValue(),
  };

  componentDidMount() {
    TopStore.on('change', () => {
      this.setState({
        top: TopStore.getTopValue()
      });
    });
  }

  closeDrawer = () => {
    TopStore.closeTopDrawer();
  }

  updateLoadedLibrary = loadedLibrary => {
    this.setState({ loadedLibrary });
  };

  renderDrawer = () => {
    const { top } = this.state;

    return (
      <Drawer
        anchor="top"
        open={top}
        onClose={this.closeDrawer}
        PaperProps={{ style: styles.PaperProps }}
        variant="temporary"
        transitionDuration={125}
      >
        <div tabIndex={0} role="button" onKeyDown={this.closeDrawer}>
          {this.renderLibraryLayout()}
        </div>
      </Drawer>
    );
  };

  renderLibraryLayout = () => {
    const {
      classes,
      openComic,
      saveContentDataToMain
    } = this.props;
    const { loadedLibrary } = this.state;

    return (
      <LibraryLayout
        className={classes.list}
        closeLibrary={this.closeDrawer}
        openComic={openComic}
        loadedLibrary={loadedLibrary}
        saveContentDataToParent={saveContentDataToMain}
        updateLoadedLibrary={this.updateLoadedLibrary}
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
  classes: PropTypes.object.isRequired,
  loadedLibrary: PropTypes.string,
  openComic: PropTypes.func.isRequired,
  saveContentDataToMain: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.object.isRequired),
};

export default withStyles(styles)(Library);
