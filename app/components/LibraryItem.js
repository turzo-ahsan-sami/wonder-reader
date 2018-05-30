import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { FaFolderO, FaFileArchiveO, FaPercent } from 'react-icons/lib/fa';
// import Bookmark from './Bookmark.js';

const iconSize = 20;
const LibraryItem = (props) => {
  const icon = props.isDirectory
    ? <FaFolderO size={iconSize} />
    : <FaFileArchiveO size={iconSize} />;

  return (
    <TableRow
      className='library-item'
      key={props.id}
      onClick={props.onRowClick}
      style={{
        cursor: 'pointer',
        fontFamily: 'Montserrat',
        fontSize: '20px'}}
    >
      <TableCell
        numeric
        padding='checkbox'
        style={{
          width: '10px'}}
      >
        {icon}
      </TableCell>
      <TableCell style={{
        color: '#333'}}
      >
        {props.basename}
      </TableCell>
      <TableCell
        numeric
        style={{
          color: '#bbb'}}
      >
        {props.dirname}
      </TableCell>
      <TableCell
        padding='checkbox'
        style={{
          width: '10px'}}
      >
        <FaPercent style={{
          color: '#999',
          fontSize: '14px'}}
        />
      </TableCell>
    </TableRow>
  );
};

LibraryItem.propTypes = {
  basename: PropTypes.string.isRequired,
  dirname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDirectory: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired
}

export default LibraryItem;
