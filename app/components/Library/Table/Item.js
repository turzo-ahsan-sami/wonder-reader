import PropTypes from 'prop-types';
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
// import Bookmark from './Bookmark.js';

import * as Cells from './Cells';

const styles = {
  cursor: 'pointer',
  fontFamily: 'Montserrat',
  fontSize: '20px',
};

const Item = ({ basename, dirname, id, isDirectory, onRowClick }) => (
  <TableRow
    className="library-item"
    key={id}
    onClick={onRowClick}
    style={styles.TableRow}
  >
    <Cells.Icon isDirectory={isDirectory} />
    <Cells.BaseName basename={basename} />
    <Cells.Dirname dirname={dirname} />
    <Cells.Percent />
  </TableRow>
);

Item.propTypes = {
  basename: PropTypes.string.isRequired,
  dirname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDirectory: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default Item;
