import React, { Component } from 'react';
import ZoomDisplay from './ZoomDisplay';
import ZoomInput from './ZoomInput';

import * as ZoomActions from '../actions/zoomActions';
import ZoomStore from '../store/ZoomStore';

// const sliderComponent = document.getElementById('sliderComponent');
const sliderInput = document.getElementById('sliderInput');

const boxShadow = (
  'inset rgb(135, 169, 214) 0px 3px 0px, inset rgba(0, 0, 0, 0.15) 0px 10px 10px'
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
    zoomLevel: ZoomStore.getZoomLevel()
  }

  componentDidMount() {
    ZoomStore.on('change', this.setZoomLevelState);
  }

  componentWillUnmount() {
    ZoomStore.removeListener('change', this.setZoomLevelState);
  }

  blurSliderInput = () => {
    sliderInput.blur();
  };

  onChange = e => {
    const zoomLevel = Number(e.target.value);
    ZoomActions.setZoomLevel(zoomLevel);
  };

  setZoomLevelState = () => {
    this.setState({
      zoomLevel: ZoomStore.getZoomLevel()
    });
  }

  renderZoomInput = () => {
    const {zoomLevel} = this.state;
    return (
      <ZoomInput
        onChange={this.onChange}
        value={zoomLevel}
      />
    );
  }

  render() {
    const { zoomLevel } = this.state;
    return (
      <div
        className="slider"
        id="sliderComponent"
        onBlur={this.blurSliderInput}
        style={styles}
      >
        {this.renderZoomInput()}
        <ZoomDisplay value={zoomLevel} />
      </div>
    );
  }
}

export default Slider;
