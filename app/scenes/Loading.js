import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  LoaderElement: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100vh',
    width: '100vw',
    zIndex: '1301',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  Paper: {
    height: '50px',
    width: '50px',
    margin: 'auto',
    marginTop: '30vh'
  },
  root: theme.mixins.gutters({
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const Loading = ({
  classes,
  loading
}) => (loading ? <LoaderElement classes={classes} /> : null);

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const LoaderElement = ({ classes }) => (
  <div style={styles.LoaderElement}>
    <PaperElement classes={classes} />
  </div>
);

LoaderElement.propTypes = {
  classes: PropTypes.object.isRequired
};

const PaperElement = ({ classes }) => (
  <Paper className={classes.root} elevation={4} style={styles.Paper}>
    <CircularProgress
      className={classes.progress}
      color="secondary"
      size={50}
    />
  </Paper>
);

PaperElement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
