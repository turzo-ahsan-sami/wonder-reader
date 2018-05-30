import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Slider extends Component {
  componentDidMount() {
    document
      .getElementById('sliderComponent')
      .addEventListener('mouseleave', this.blurSliderInput);
  }

  blurSliderInput = () => {
    document.getElementById('SliderInput').blur();
  }

  onChange = (e) => {
    const {value} = e.target;
    console.log(value);
    this.props.onChange(value);
  }

  render() {
    return(
      <div
        className='slider'
        id='sliderComponent'
        style={{
          border: '1px solid rgba(255,255,255,0.3)',
          borderTop: '2px solid rgba(255,255,255,0.8)',
          borderRadius: '5px',
          display: 'flex',
          float: 'left',
          padding: '3px',
          marginTop: '7px',
          boxShadow: 'inset rgb(135, 169, 214) 0px 3px 0px, inset rgba(0, 0, 0, 0.15) 0px 10px 10px'}}
      >
        <input
          id='SliderInput'
          min='25'
          max='200'
          name='slider'
          onChange={this.onChange}
          type='range'
          value={this.props.value}
          style={{width: '100px'}}
        />
        <div
          className='zoomLevel'
          style={{
            fontFamily: 'Carter One',
            fontSize: '20px',
            width: '45px'
          }}
        >
          {this.props.value}
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default Slider;
