import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SliderInput from './SliderInput';
import ZoomLevel from './ZoomLevel';

const boxShadow =
  'inset rgb(135, 169, 214) 0px 3px 0px, inset rgba(0, 0, 0, 0.15) 0px 10px 10px';

const styles = {
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '5px',
  borderTop: '2px solid rgba(255,255,255,0.8)',
  boxShadow,
  display: 'flex',
  float: 'left',
  marginTop: '7px',
  padding: '3px'
};

const sliderComponent = document.getElementById('sliderComponent');

class Slider extends Component {
  componentDidMount() {
    if (sliderComponent) {
      sliderComponent.addEventListener('mouseleave', this.blurSliderInput);
    }
  }

  componentWillUnmount() {
    if (sliderComponent) {
      sliderComponent.removeEventListener('mouseleave', this.blurSliderInput);
    }
  }

  blurSliderInput = () => {
    document.getElementById('SliderInput').blur();
  };

  onChange = e => {
    const { onChange } = this.props;
    const { value } = e.target;
    console.log(value);
    onChange(value);
  };

  render() {
    const { value } = this.props;
    return (
      <div className="slider" id="sliderComponent" style={styles}>
        <SliderInput onChange={this.onChange} value={value} />
        <ZoomLevel value={value} />
      </div>
    );
  }
}

Slider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default Slider;
