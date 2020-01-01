import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FaPercent } from 'react-icons/lib/fa';

const styles = {
  fontFamily: 'Carter One',
};

const Header = () => (
  <TableHead>
    <TableRow style={styles}>
      <TableCell padding="checkbox" />
      <TableCell>Name</TableCell>
      <TableCell numeric>Directory</TableCell>
      <TableCell padding="checkbox">
        <FaPercent />
      </TableCell>
    </TableRow>
  </TableHead>
);

export default Header;
