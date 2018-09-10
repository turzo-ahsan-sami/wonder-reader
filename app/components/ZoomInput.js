import PropTypes from 'prop-types';
import React from 'react';

const ZoomInput = ({
  onChange,
  value
}) => (
  <input
    id="sliderInput"
    min="25"
    max="200"
    name="slider"
    onChange={onChange}
    type="range"
    value={value}
    style={{width: '100px'}}
  />
);

ZoomInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default ZoomInput;
