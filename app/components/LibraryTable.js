import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FaPercent } from 'react-icons/lib/fa';

import LibraryItem from './LibraryItem';

const HeaderRow = () => (
  <TableRow style={styles.font}>
    <TableCell padding="checkbox" />
    <TableCell>Name</TableCell>
    <TableCell numeric>Directory</TableCell>
    <TableCell padding="checkbox">
      <FaPercent />
    </TableCell>
  </TableRow>
);

class LibraryTable extends Component {
  generateLibraryItem = content => {
    const { basename, dirname, id, isDirectory } = content;
    const { onContentClick } = this.props;

    return (
      <LibraryItem
        basename={basename}
        dirname={dirname}
        id={id}
        isDirectory={isDirectory}
        onRowClick={() => {
          onContentClick(content);
        }}
        style={styles.LibraryItem}
      />
    );
  };

  generateLibraryItems = () => {
    const { contents } = this.props;
    return contents.map(this.generateLibraryItem);
  };

  renderTableBody = () => {
    const libraryItems = this.generateLibraryItems();
    return <TableBody>{libraryItems}</TableBody>;
  };

  renderTableHead = () => (
    <TableHead>
      <HeaderRow />
    </TableHead>
  );

  render() {
    return (
      <Table className="library-menu" selectable="false">
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    );
  }
}

LibraryTable.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.object).isRequired,
  onContentClick: PropTypes.func.isRequired
};

const styles = {
  font: {
    fontFamily: 'Carter One'
  },
  LibraryItem: {
    marginLeft: '5vw',
    maxHeight: '50vh',
    maxWidth: '50vw'
  }
};

export default LibraryTable;
