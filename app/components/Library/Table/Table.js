import React from 'react';
import TableContainer from '@material-ui/core/Table';

import Body from './Body';
import Header from './Header';

const Table = ({ contents, onContentClick }) => (
  <TableContainer className="library-menu" selectable="false">
    <Header />
    <Body contents={contents} onContentClick={onContentClick} />
  </TableContainer>
);

export default Table;
