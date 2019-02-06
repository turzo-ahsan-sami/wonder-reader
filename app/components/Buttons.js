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

const ButtonChangePageCountDouble = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaMinusSquareO />}
    onClick={onClick}
    style={determineStyles(90)}
  />
);

ButtonChangePageCountDouble.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ButtonChangePageCountSingle = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaSquareO />}
    onClick={onClick}
  />
);

ButtonChangePageCountSingle.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ButtonClose = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaClose />}
    onClick={onClick}
    style={closeButtonStyle}
  />
);

ButtonClose.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ButtonLevelUp = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaLevelUp />}
    onClick={onClick}
  />
);

ButtonLevelUp.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ButtonNextComic = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaAngleDoubleRight />}
    onClick={onClick}
  />
);

ButtonNextComic.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ButtonOpenFolder = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaFolderOpen />}
    onClick={onClick}
  />
);

ButtonOpenFolder.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ButtonOpenLibrary = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaBook />}
    onClick={onClick}
  />
);

ButtonOpenLibrary.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ButtonPageLeft = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaAngleLeft />}
    onClick={onClick}
  />
);

ButtonPageLeft.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ButtonPageRight = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaAngleRight />}
    onClick={onClick}
  />
);

ButtonPageRight.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ButtonPrevComic = ({ onClick }) => (
  <ButtonPrototype
    icon={<FaAngleDoubleLeft />}
    onClick={onClick}
  />
);

ButtonPrevComic.propTypes = {
  onClick: PropTypes.func.isRequired
};

export {
  ButtonChangePageCountDouble,
  ButtonChangePageCountSingle,
  ButtonNextComic,
  ButtonOpenLibrary,
  ButtonPageLeft,
  ButtonPageRight,
  ButtonPrevComic,
  ButtonClose,
  ButtonLevelUp,
  ButtonOpenFolder
};
