import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaBook,
  FaClose,
  FaFolderOpen,
  FaLevelUp,
  FaMinusSquareO,
  FaSquareO
} from 'react-icons/lib/fa';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';

const margin = '2px';
const textShadow = '0 0 5px rgba(0,0,0,0.5)';

const determineStyles = rotation => ({
  margin,
  textShadow,
  transform: `rotate(${rotation}deg)`
});

const closeButtonStyle = {
  background: '#ef5350',
  margin,
  textShadow
};

const ButtonPrototype = ({
  disabled,
  icon,
  onClick,
  style
}) => (
  <IconButton
    color="primary"
    disabled={disabled}
    onClick={onClick}
    style={style}
  >
    {icon}
  </IconButton>
);

ButtonPrototype.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
};

ButtonPrototype.defaultProps = {
  disabled: false,
  style: {
    margin,
    textShadow
  }
};

const ChangePageCountDouble = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaMinusSquareO />}
    onClick={onClick}
    style={determineStyles(90)}
  />
);

ChangePageCountDouble.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ChangePageCountSingle = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaSquareO />}
    onClick={onClick}
  />
);

ChangePageCountSingle.propTypes = {
  onClick: PropTypes.func.isRequired
};

const Close = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaClose />}
    onClick={onClick}
    style={closeButtonStyle}
  />
);

Close.propTypes = {
  onClick: PropTypes.func.isRequired
};

const LevelUp = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaLevelUp />}
    onClick={onClick}
  />
);

LevelUp.propTypes = {
  onClick: PropTypes.func.isRequired
};

const NextComic = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaAngleDoubleRight />}
    onClick={onClick}
  />
);

NextComic.propTypes = {
  onClick: PropTypes.func.isRequired
};

const OpenFolder = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaFolderOpen />}
    onClick={onClick}
  />
);

OpenFolder.propTypes = {
  onClick: PropTypes.func.isRequired
};

const OpenLibrary = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaBook />}
    onClick={onClick}
  />
);

OpenLibrary.propTypes = {
  onClick: PropTypes.func.isRequired
};

const PageLeft = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaAngleLeft />}
    onClick={onClick}
  />
);

PageLeft.propTypes = {
  onClick: PropTypes.func.isRequired
};

const PageRight = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaAngleRight />}
    onClick={onClick}
  />
);

PageRight.propTypes = {
  onClick: PropTypes.func.isRequired
};

const PrevComic = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaAngleDoubleLeft />}
    onClick={onClick}
  />
);

PrevComic.propTypes = {
  onClick: PropTypes.func.isRequired
};

const Toggle = ({bool, onClick}) => (
  bool ? (
    <ButtonPrototype
      icon={<FaSquareO />}
      onClick={onClick}
    />
  ) : (
    <ButtonPrototype
      icon={<FaMinusSquareO />}
      onClick={onClick}
      style={determineStyles(90)}
    />
  )
);

Toggle.propTypes = {
  bool: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export {
  ChangePageCountDouble,
  ChangePageCountSingle,
  Close,
  LevelUp,
  NextComic,
  OpenFolder,
  OpenLibrary,
  PageLeft,
  PageRight,
  PrevComic,
  Toggle,
};
