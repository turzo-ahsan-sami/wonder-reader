import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaBook,
  FaMinusSquareO,
  FaSquareO
} from 'react-icons/lib/fa';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { buttonStyle, buttonTheme } from './buttonStyle';
import Slider from './Slider';

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

  determineButtonStyle = item => {
    const rotation = typeof item.rotation === 'undefined' ? 0 : item.rotation;
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

  determineIfChangePageCount = (icons, item) =>
    item.name === 'changePageCount' ? icons : item.icon;

  renderButton = item => {
    const { buttons } = this.props;
    const button = buttons[item.name];
    const icon = this.determineIfChangePageCount(this.determineIcon(), item);
    const buttonFunction = this.determineButtonFunction(button);
    const style = this.determineButtonStyle(item);

    if (item.color) {
      style.background = '#ef5350';
    }
    return (
      <IconButton
        key={item.key}
        color="primary"
        disabled={button.disabled}
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
