import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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

const Library = ({ classes, style }) => {
  const [active, setActiveState] = useState(store.top.getAll());

  const updateActiveState = () => {
    setActiveState(store.top.getAll());
  };

  useEffect(() => {
    store.top.on('change', updateActiveState);
    return store.top.removeListener('change', updateActiveState);
  });

  return (
    <div
      className="Library"
      style={style}
    >
      <Drawer
        anchor="top"
        onClose={actions.top.closeLibrary}
        open={active}
        PaperProps={{ style: styles.PaperProps }}
        transitionDuration={125}
        variant="temporary"
      >
        <div
          onKeyDown={actions.top.closeLibrary}
          role="button"
          tabIndex={0}
        >
          <LibraryLayout className={classes.list} />
        </div>
      </Drawer>
    </div>
  );
};

Library.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.objectOf(PropTypes.object.isRequired),
};

Library.defaultProps = {
  style: {}
};

export default withStyles(styles)(Library);
