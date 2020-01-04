import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { FaClose, FaFolderOpen, FaLevelUp } from 'react-icons/lib/fa';

const styles = {
  background: '#ef5350',
};

const Close = onClick => (
  <IconButton onClick={onClick} color="primary" style={styles}>
    <FaClose />
  </IconButton>
);

const FolderOpen = ({ onClick }) => (
  <IconButton onClick={onClick} color="primary">
    <FaFolderOpen />
  </IconButton>
);

const LevelUp = ({ onClick }) => (
  <IconButton onClick={onClick} color="primary">
    <FaLevelUp />
  </IconButton>
);

export { Close, FolderOpen, LevelUp };
