import IconButton from '@material-ui/core/IconButton';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaBook,
  FaMinusSquareO,
  FaSquareO
} from 'react-icons/lib/fa';

import Slider from './Slider';
import { buttonStyle, buttonTheme } from './buttonStyle';

const initButtons = [
  {
    name: 'openLibrary',
    icon: <FaBook />,
    rotation: 0,
    key: '000'
  },
  {
    name: 'changePageCount',
    icon: <FaMinusSquareO />,
    rotation: 90,
    key: '001'
  },
  {
    name: 'prevComic',
    icon: <FaAngleDoubleLeft />,
    rotation: 0,
    key: '002'
  },
  {
    name: 'pageLeft',
    icon: <FaAngleLeft />,
    rotation: 0,
    key: '003'
  },
  {
    name: 'pageRight',
    icon: <FaAngleRight />,
    rotation: 0,
    key: '004'
  },
  {
    name: 'nextComic',
    icon: <FaAngleDoubleRight />,
    rotation: 0,
    key: '005'
  }
];

class ButtonBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: initButtons
    };
  }

  determineButtonFunction = button => (button.func ? button.func : () => {});

  determineButtonStyle = button => {
    const rotation =
      typeof button.rotation === 'undefined' ? 0 : button.rotation;
    return {
      margin: '2px',
      textShadow: '0 0 5px rgba(0,0,0,0.5)',
      transform: `rotate(${rotation}deg)`
    };
  };

  determineIcon = () => {
    const { pageCount } = this.props;
    return pageCount === 2 ? <FaMinusSquareO /> : <FaSquareO />;
  };

  determineIfChangePageCount = (icon, button) =>
    button.name === 'changePageCount' ? icon : button.icon;

  renderButton = button => {
    const { buttons } = this.props;
    const buttonFunction = this.determineButtonFunction(buttons[button.name]);
    const icon = this.determineIfChangePageCount(this.determineIcon(), button);
    const style = this.determineButtonStyle(button);

    if (button.color) {
      style.background = '#ef5350';
    }
    return (
      <IconButton
        key={button.key}
        color="primary"
        disabled={buttons[button.name].disabled}
        onClick={buttonFunction}
        style={style}
      >
        {icon}
      </IconButton>
    );
  };

  render() {
    const { setZoomLevel, zoomLevel } = this.props;
    const { buttons } = this.state;
    const renderedButtons = buttons.map(this.renderButton);
    return (
      <MuiThemeProvider theme={buttonTheme}>
        <div style={buttonStyle}>
          <Slider onChange={setZoomLevel} value={zoomLevel} />
          {renderedButtons}
        </div>
      </MuiThemeProvider>
    );
  }
}

ButtonBar.propTypes = {
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default ButtonBar;
