import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FaPercent } from 'react-icons/lib/fa';

import LibraryItem from './LibraryItem.js';
import 'typeface-carter-one';

class LibraryTable extends Component {
  generateLibraryItem = (content, props) => {
    return (
      <LibraryItem
        key={content.id}
        id={content.id}
        basename={content.basename}
        dirname={content.dirname}
        fullpath={content.fullpath}
        isDirectory={content.isDirectory}
        contents={content.contents}
        onRowClick={() => {props.onContentClick(content);}}

        style={{
          marginLeft: '5vw',
          maxHeight: '50vh',
          maxWidth: '50vw'
        }}/>
    );
  }

  generateLibraryItems = (props) => {
    // console.log('generateLibraryItems', props);
    const contents = props.contents;
    return contents.map((content) => {
      return this.generateLibraryItem(content, props);
    });
  }

  render() {
    // console.log('LibraryTable', this.props);
    const libraryItems = this.generateLibraryItems(this.props);
    return(
      <Table
        className="library-menu"
        selectable='false'>
        <TableHead>
          <TableRow style={{
            fontFamily: 'Carter One'}}>
            <TableCell
              padding='checkbox'></TableCell>
            <TableCell>Name</TableCell>
            <TableCell
              numeric={true}>Directory</TableCell>
            <TableCell padding='checkbox'>
              <FaPercent />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {libraryItems}
        </TableBody>
      </Table>
    );
  }
}

export default LibraryTable;
