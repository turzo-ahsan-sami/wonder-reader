import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { FaFolderO, FaFileArchiveO, FaPercent } from 'react-icons/lib/fa';
// import Bookmark from './Bookmark.js';

const iconSize = 20;

const styles = {
  bbb: {
    color: '#bbb'
  },
  percent: {
    color: '#999',
    fontSize: '14px'
  },
  TableRow: {
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    fontSize: '20px'
  },
  three33: {
    color: '#333'
  },
  wide: {
    width: '10px'
  }
};

const CellBaseName = ({ basename }) => (
  <TableCell style={styles.three33}>{basename}</TableCell>
);

const CellDirname = ({ dirname }) => (
  <TableCell numeric style={styles.bbb}>
    {dirname}
  </TableCell>
);

const CellIcon = ({ icon }) => (
  <TableCell numeric padding="checkbox" style={styles.wide}>
    {icon}
  </TableCell>
);

const CellPercent = () => (
  <TableCell padding="checkbox" style={styles.wide}>
    <FaPercent style={styles.percent} />
  </TableCell>
);

const LibraryItem = ({ basename, dirname, id, isDirectory, onRowClick }) => {
  const icon = isDirectory ? (
    <FaFolderO size={iconSize} />
  ) : (
    <FaFileArchiveO size={iconSize} />
  );

  return (
    <TableRow
      className="library-item"
      key={id}
      onClick={onRowClick}
      style={styles.TableRow}
    >
      <CellIcon icon={icon} />
      <CellBaseName basename={basename} />
      <CellDirname dirname={dirname} />
      <CellPercent />
    </TableRow>
  );
};

LibraryItem.propTypes = {
  basename: PropTypes.string.isRequired,
  dirname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDirectory: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired
};

export default LibraryItem;
