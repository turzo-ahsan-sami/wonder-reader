import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  fontFamily: 'Carter One',
  fontSize: '20px',
  width: '45px',
  cursor: 'default',
};

const ZoomLevel = ({ value }) => (
  <div className="zoomLevel" style={styles}>
    {value}
  </div>
);

ZoomLevel.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default ZoomLevel;
