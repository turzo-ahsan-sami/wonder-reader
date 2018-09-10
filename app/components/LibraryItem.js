import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';

import { FaFileArchiveO, FaFolderO } from 'react-icons/lib/fa';
// import Bookmark from './Bookmark.js';

import {
  CellBasename,
  CellDirname,
  CellIcon,
  CellPercent,
} from './Cells';

const determineIcon = (bool) => (
  bool
    ? <FaFolderO size={iconSize} />
    : <FaFileArchiveO size={iconSize} />
);

const LibraryItem = ({
  basename,
  dirname,
  id,
  isDirectory,
  onRowClick
}) => (
  <TableRow
    className="library-item"
    key={id}
    onClick={onRowClick}
    style={styles}
  >
    <CellIcon icon={determineIcon(isDirectory)} />
    <CellBasename basename={basename} />
    <CellDirname dirname={dirname} />
    <CellPercent />
  </TableRow>
);


LibraryItem.propTypes = {
  basename: PropTypes.string.isRequired,
  dirname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDirectory: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired
};

const iconSize = 20;

const styles = {
  cursor: 'pointer',
  fontFamily: 'Montserrat',
  fontSize: '20px'
};

export default LibraryItem;
