import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as actions from '../actions';
import * as store from '../store';
import LibraryLayout from '../components/LibraryLayout';

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
    top: store.top.getTopValue(),
  };

  componentDidMount() {
    store.top.on('change', this.setTopState);
  }

  componentWillUnmount() {
    store.top.removeListener('change', this.setTopState);
  }

  setTopState = () => {
    this.setState({
      top: store.top.getTopValue()
    });
  };

  renderDrawer = () => {
    const { top } = this.state;

    return (
      <Drawer
        anchor="top"
        onClose={actions.top.closeLibrary}
        open={top}
        PaperProps={{ style: styles.PaperProps }}
        transitionDuration={125}
        variant="temporary"
      >
        <div
          onKeyDown={actions.top.closeLibrary}
          role="button"
          tabIndex={0}
        >
          {this.renderLibraryLayout()}
        </div>
      </Drawer>
    );
  };

  renderLibraryLayout = () => {
    const { classes } = this.props;
    return <LibraryLayout className={classes.list} />;
  };

  render() {
    const { style } = this.props;
    return (
      <div
        className="Library"
        style={style}
      >
        {this.renderDrawer()}
      </div>
    );
  }
}

Library.defaultProps = {
  style: {}
};

Library.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.objectOf(PropTypes.object.isRequired),
};

export default withStyles(styles)(Library);
