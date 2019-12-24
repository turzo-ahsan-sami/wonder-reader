import React from 'react';

const styles = {
  zoomLevel: {
    fontFamily: 'Carter One',
    fontSize: '20px',
    width: '45px',
    cursor: 'default'
  }
};

const ZoomLevel = ({ value }) => (
  <div className="zoomLevel" style={styles.zoomLevel}>
    {value}
  </div>
);

export default ZoomLevel;
