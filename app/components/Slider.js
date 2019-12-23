import React, { useEffect, useState } from 'react';

import ZoomDisplay from './ZoomDisplay';
import ZoomInput from './ZoomInput';

import * as actions from '../actions';
import * as store from '../store';

const boxShadow = (
  'inset rgb(135, 169, 214) 0px 3px 0px,'
  + 'inset rgba(0, 0, 0, 0.15) 0px 10px 10px'
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

const Slider = () => {
  const [zoomLevel, setZoomLevel] = useState(store.zoom.getZoomLevel());

  const updateZoomLevel = () => {
    setZoomLevel(store.zoom.getZoomLevel());
  };

  useEffect(() => {
    store.zoom.on('change', updateZoomLevel);
    return store.zoom.removeListener('change', updateZoomLevel);
  });

  return (
    <div
      className="slider"
      id="sliderComponent"
      onBlur={() => document.getElementById('sliderInput').blur()}
      style={styles}
    >
      <ZoomInput
        onChange={e => {
          const zoomLevel = Number(e.target.value);
          actions.zoom.setZoomLevel(zoomLevel);
        }}
        value={zoomLevel}
      />
      <ZoomDisplay value={zoomLevel} />
    </div>
  );
};

export default Slider;
