import PropTypes from 'prop-types';
import React from 'react';

const ZoomDisplay = ({ value }) => (
  <div
    className="zoomLevel"
    style={{
      fontFamily: 'Carter One',
      fontSize: '20px',
      width: '45px',
      cursor: 'default'
    }}
  >
    {value}
  </div>
);

ZoomDisplay.propTypes = {
  value: PropTypes.number.isRequired
};

export default ZoomDisplay;
