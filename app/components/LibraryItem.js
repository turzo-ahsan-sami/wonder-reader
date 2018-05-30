import 'typeface-montserrat';

import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { FaFolderO, FaFileArchiveO, FaPercent } from 'react-icons/lib/fa';
// import Bookmark from './Bookmark.js';

const iconSize = 20;
const LibraryItem = (PROPS) => {
  const icon = PROPS.isDirectory
    ? <FaFolderO size={iconSize} />
    : <FaFileArchiveO size={iconSize} />;

  return (
    <TableRow
      className='library-item'
      key={PROPS.id}
      onClick={PROPS.onRowClick}
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
        {PROPS.basename}
      </TableCell>
      <TableCell
        numeric
        style={{
          color: '#bbb'}}
      >
        {PROPS.dirname}
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

export default LibraryItem;
