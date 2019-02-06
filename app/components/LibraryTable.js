import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';

import LibraryItem from './LibraryItem';
import LibraryTableHead from './LibraryTableHead';

class LibraryTable extends Component {
  renderLibraryItem = content => {
    const {
      basename,
      dirname,
      id,
      isDirectory
    } = content;
    const { onContentClick } = this.props;

    return (
      <LibraryItem
        basename={basename}
        dirname={dirname}
        id={id}
        isDirectory={isDirectory}
        onRowClick={() => { onContentClick(content);}}
        style={{
          marginLeft: '5vw',
          maxHeight: '50vh',
          maxWidth: '50vw'
        }}
      />
    );
  };

  renderLibraryItems = (contents) => contents.map(this.renderLibraryItem);

  renderTableBody = (contents) => (
    <TableBody>
      {this.renderLibraryItems(contents)}
    </TableBody>
  );

  render() {
    const { contents } = this.props;
    return (
      <Table
        className="library-menu"
        selectable="false"
      >
        <TableHead>
          <LibraryTableHead />
        </TableHead>
        {this.renderTableBody(contents)}
      </Table>
    );
  }
}

LibraryTable.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.object).isRequired,
  onContentClick: PropTypes.func.isRequired
};

export default LibraryTable;
