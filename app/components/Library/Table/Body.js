import React from 'react';
import TableBody from '@material-ui/core/TableBody';

import generateItem from './generateItem';

const Body = ({ contents, onContentClick }) => (
  <TableBody>{contents.map(generateItem(onContentClick))}</TableBody>
);

export default Body;
