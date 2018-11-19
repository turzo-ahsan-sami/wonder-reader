import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as TopActions from '../actions/topActions';
import LibraryLayout from '../components/LibraryLayout';
import TopStore from '../store/TopStore';

class Library extends Component {
  state = {
    top: TopStore.getTopValue(),
  };

  componentDidMount() {
    TopStore.on('change', this.setTopState);
  }

  componentWillUnmount() {
    TopStore.removeListener('change', this.setTopState);
  }

  setTopState = () => {
    this.setState({
      top: TopStore.getTopValue()
    });
  }

  renderDrawer = () => {
    const { top } = this.state;

    return (
      <Drawer
        anchor="top"
        onClose={TopActions.closeLibrary}
        open={top}
        PaperProps={{ style: styles.PaperProps }}
        transitionDuration={125}
        variant="temporary"
      >
        <div
          onKeyDown={TopActions.closeLibrary}
          role="button"
          tabIndex={0}
        >
          {this.renderLibraryLayout()}
        </div>
      </Drawer>
    );
  };

  renderLibraryLayout = () => {
    const {classes} = this.props;
    return <LibraryLayout className={classes.list} />;
  }

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

export default withStyles(styles)(Library);
