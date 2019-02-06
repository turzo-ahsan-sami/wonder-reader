import PropTypes from 'prop-types';
import React from 'react';
import { FaPercent } from 'react-icons/lib/fa';
import { TableCell } from '@material-ui/core';

const styles = {
  bbb: {
    color: '#bbb'
  },
  percent: {
    color: '#999',
    fontSize: '14px'
  },
  three33: {
    color: '#333'
  },
  wide: {
    width: '10px'
  }
};

const CellBasename = ({ basename }) => (
  <TableCell style={styles.three33}>
    {basename}
  </TableCell>
);

CellBasename.propTypes = {
  basename: PropTypes.string.isRequired
};

const CellDirname = ({ dirname }) => (
  <TableCell
    numeric
    style={styles.bbb}
  >
    {dirname}
  </TableCell>
);

CellDirname.propTypes = {
  dirname: PropTypes.string.isRequired
};

const CellIcon = ({ icon }) => (
  <TableCell
    numeric
    padding="checkbox"
    style={styles.wide}
  >
    {icon}
  </TableCell>
);

CellIcon.propTypes = {
  icon: PropTypes.element.isRequired
};

const CellPercent = () => (
  <TableCell
    padding="checkbox"
    style={styles.wide}
  >
    <FaPercent style={styles.percent} />
  </TableCell>
);

export {
  CellBasename,
  CellDirname,
  CellIcon,
  CellPercent,
};
