import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FaPercent } from 'react-icons/lib/fa';

import LibraryItem from './LibraryItem';

const styles = {
  font: {
    fontFamily: 'Carter One',
  },
  LibraryItem: {
    marginLeft: '5vw',
    maxHeight: '50vh',
    maxWidth: '50vw',
  },
};

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
  generateLibraryItem = (content) => {
    const { basename, contents, dirname, fullpath, id, isDirectory } = content;

    const { onContentClick } = this.props;

    return (
      <LibraryItem
        key={id}
        id={id}
        basename={basename}
        dirname={dirname}
        fullpath={fullpath}
        isDirectory={isDirectory}
        contents={contents}
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

  render() {
    const libraryItems = this.generateLibraryItems();
    return (
      <Table className="library-menu" selectable="false">
        <TableHead>
          <HeaderRow />
        </TableHead>
        <TableBody>{libraryItems}</TableBody>
      </Table>
    );
  }
}

export default LibraryTable;
