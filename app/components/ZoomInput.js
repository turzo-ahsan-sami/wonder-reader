import PropTypes from 'prop-types';
import React from 'react';

const ZoomInput = ({
  onChange,
  value
}) => (
  <input
    id="sliderInput"
    max="200"
    min="25"
    name="slider"
    onChange={onChange}
    style={{width: '100px'}}
    type="range"
    value={value}
  />
);

ZoomInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default ZoomInput;
