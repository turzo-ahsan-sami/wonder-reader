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
      <div className="slider" id="sliderComponent" style={styles.Slider}>
        <Input onChange={this.onChange} value={value} />
        <ZoomLevel value={value} />
      </div>
    );
  }
}

Slider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

const Input = ({ onChange, value }) => (
  <input
    id="SliderInput"
    min="25"
    max="200"
    name="slider"
    onChange={onChange}
    type="range"
    value={value}
    style={styles.wide}
  />
);

const ZoomLevel = ({ value }) => (
  <div className="zoomLevel" style={styles.zoomLevel}>
    {value}
  </div>
);

const boxShadow =
  'inset rgb(135, 169, 214) 0px 3px 0px, inset rgba(0, 0, 0, 0.15) 0px 10px 10px';

const styles = {
  Slider: {
    border: '1px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid rgba(255,255,255,0.8)',
    borderRadius: '5px',
    display: 'flex',
    float: 'left',
    padding: '3px',
    marginTop: '7px',
    boxShadow
  },
  wide: {
    width: '100px'
  },
  zoomLevel: {
    fontFamily: 'Carter One',
    fontSize: '20px',
    width: '45px',
    cursor: 'default'
  }
};

export default Slider;
