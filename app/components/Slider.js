import React, { Component } from 'react';

import ZoomDisplay from './ZoomDisplay';
import ZoomInput from './ZoomInput';

import * as actions from '../actions';
import * as store from '../store';

// const sliderComponent = document.getElementById('sliderComponent');
const sliderInput = document.getElementById('sliderInput');

const boxShadow = (
  'inset rgb(135, 169, 214) 0px 3px 0px,'
  + 'inset rgba(0, 0, 0, 0.15) 0px 10px 10px'
);

const styles = {
  alignItems: 'center',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '5px',
  borderTop: '2px solid rgba(255,255,255,0.8)',
  boxShadow,
  display: 'flex',
  justifyContent: 'center',
  marginTop: '7px',
  padding: '3px'
};

class Slider extends Component {
  state = {
    zoomLevel: store.zoom.getZoomLevel()
  };

  componentDidMount() {
    store.zoom.on('change', this.setZoomLevelState);
  }

  componentWillUnmount() {
    store.zoom.removeListener('change', this.setZoomLevelState);
  }

  blurSliderInput = () => {
    sliderInput.blur();
  };

  onChange = e => {
    const zoomLevel = Number(e.target.value);
    actions.zoom.setZoomLevel(zoomLevel);
  };

  setZoomLevelState = () => {
    this.setState({
      zoomLevel: store.zoom.getZoomLevel()
    });
  };

  render() {
    const { zoomLevel } = this.state;
    return (
      <div
        className="slider"
        id="sliderComponent"
        onBlur={this.blurSliderInput}
        style={styles}
      >
        <ZoomInput
          onChange={this.onChange}
          value={zoomLevel}
        />
        <ZoomDisplay value={zoomLevel} />
      </div>
    );
  }
}

export default Slider;
