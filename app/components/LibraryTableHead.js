import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { FaPercent } from 'react-icons/lib/fa';

const CellDirectory = () => (
  <TableCell numeric>Directory</TableCell>
);

const CellName = () => (
  <TableCell>Name</TableCell>
);

const CellPercent = () => (
  <TableCell padding="checkbox">
    <FaPercent />
  </TableCell>
);

const CellPrime = () => (
  <TableCell padding="checkbox" />
);

const LibraryTableHead = () => (
  <TableRow style={{fontFamily: 'Carter One'}}>
    <CellPrime />
    <CellName />
    <CellDirectory />
    <CellPercent />
  </TableRow>
);

export default LibraryTableHead;
