import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: theme.mixins.gutters({
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const Loading = props => {
  const { classes } = props;
  return props.isLoading ? (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw',
        zIndex: '1301',
        backgroundColor: 'rgba(0,0,0,0.2)'
      }}
    >
      <Paper
        className={classes.root}
        elevation={4}
        style={{
          height: '50px',
          width: '50px',
          margin: 'auto',
          marginTop: '30vh'
        }}
      >
        <CircularProgress
          className={classes.progress}
          color="secondary"
          size={50}
        />
      </Paper>
    </div>
  ) : null;
};

Loading.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Loading);
