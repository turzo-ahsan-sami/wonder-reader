import React from 'react';

const styles = {
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

const SliderInput = ({ onChange, value }) => (
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

export default SliderInput;
