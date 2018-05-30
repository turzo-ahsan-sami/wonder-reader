import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaBook,
  FaCog,
  FaMinusSquareO,
  FaSquareO,
} from 'react-icons/lib/fa';
import MdDelete from 'react-icons/lib/md/delete';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {buttonStyle, buttonTheme} from './buttonStyle';
import Slider from './Slider';

class ButtonBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [{
        name: 'openLibrary',
        icon: <FaBook />,
        rotation: 0,
        key: '000'
      }, {
        name: 'changePageCount',
        icon: <FaMinusSquareO />,
        rotation: 90,
        key: '001'
      }, {
        name: 'prevComic',
        icon: <FaAngleDoubleLeft />,
        rotation: 0,
        key: '002'
      }, {
        name: 'pageLeft',
        icon: <FaAngleLeft />,
        rotation: 0,
        key: '003'
      }, {
        name: 'pageRight',
        icon: <FaAngleRight />,
        rotation: 0,
        key: '004'
      },{
        name: 'nextComic',
        icon: <FaAngleDoubleRight />,
        rotation: 0,
        key: '005'
      },{
        name: 'options',
        icon: <FaCog />,
        rotation: 0,
        key: '006'
      },{
        name: 'trash',
        icon: <MdDelete />,
        rotation: 0,
        key: '007',
        color: 'secondary'
      }]
    };
  }

  renderButton = (item) => {
    const thisProp = this.props.buttons[item.name];
    const icons = this.props.pageCount === 2
      ? <FaMinusSquareO />
      : <FaSquareO />
    const icon = item.name === 'changePageCount'
      ? icons
      : item.icon;
    const thisFunc = thisProp.func
      ? thisProp.func
      : () => {}
    const onClick = thisProp
      ? thisFunc
      : () => {};

    const style = {
      margin: '2px',
      textShadow: '0 0 5px rgba(0,0,0,0.5)',
      transform: `rotate(${item.rotation}deg)`,
    };
    if (item.color) {
      style.background = '#ef5350';
    }
    return (
      <IconButton
        key={item.key}
        color='primary'
        disabled={thisProp.disabled}
        onClick={onClick}
        style={style}
      >
        {icon}
      </IconButton>
    );
  }

  render() {
    const buttons = [].slice.call(this.state.buttons);
    const renderedButtons = buttons.map((button) =>
      this.renderButton(button)
    );
    return (
      <MuiThemeProvider theme={buttonTheme}>
        <div style={buttonStyle}>
          <Slider
            onChange={this.props.setZoomLevel}
            value={this.props.zoomLevel}
          />
          { renderedButtons }
        </div>
      </MuiThemeProvider>
    );
  }
}

ButtonBar.propTypes = {
  buttons: PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired
}

export default ButtonBar;
