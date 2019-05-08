import PropTypes from 'prop-types';
import React  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';

import LibraryItem from './LibraryItem';
import LibraryTableHead from './LibraryTableHead';

const LibraryTable = ({ contents, onContentClick }) => {
  const renderLibraryItem = content => (
    <LibraryItem
      basename={content.basename}
      dirname={content.dirname}
      id={content.id}
      isDirectory={content.isDirectory}
      onRowClick={() => onContentClick(content)}
      style={{
        marginLeft: '5vw',
        maxHeight: '50vh',
        maxWidth: '50vw'
      }}
    />
  );

  return (
    <Table
      className="library-menu"
      selectable="false"
    >
      <TableHead>
        <LibraryTableHead />
      </TableHead>
      <TableBody>
        {contents.map(renderLibraryItem)}
      </TableBody>
    </Table>
  );
};

LibraryTable.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.object).isRequired,
  onContentClick: PropTypes.func.isRequired
};

export default LibraryTable;
