import React from 'react';

import Item from './Item';

const styles = {
  marginLeft: '5vw',
  maxHeight: '50vh',
  maxWidth: '50vw',
};

const generateItem = onContentClick => (content) => {
  const { basename, contents, dirname, fullpath, id, isDirectory } = content;

  return (
    <Item
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
      style={styles}
    />
  );
};

export default generateItem;
