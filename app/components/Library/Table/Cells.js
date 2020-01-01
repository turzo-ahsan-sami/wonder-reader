// import Bookmark from './Bookmark.js';
// import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { FaFolderO, FaFileArchiveO, FaPercent } from 'react-icons/lib/fa';

const iconSize = 20;

const styles = {
  bbb: {
    color: '#bbb',
  },
  percent: {
    color: '#999',
    fontSize: '14px',
  },
  three33: {
    color: '#333',
  },
  wide: {
    width: '10px',
  },
};

const BaseName = ({ basename }) => (
  <TableCell style={styles.three33}>{basename}</TableCell>
);

const Dirname = ({ dirname }) => (
  <TableCell numeric style={styles.bbb}>
    {dirname}
  </TableCell>
);

const Icon = ({ isDirectory }) => (
  <TableCell numeric padding="checkbox" style={styles.wide}>
    {isDirectory ? (
      <FaFolderO size={iconSize} />
    ) : (
      <FaFileArchiveO size={iconSize} />
    )}
  </TableCell>
);

const Percent = () => (
  <TableCell padding="checkbox" style={styles.wide}>
    <FaPercent style={styles.percent} />
  </TableCell>
);

export { BaseName, Dirname, Icon, Percent };
