import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';
import {SET_ZOOM_LEVEL} from '../constants';

const pageViewer = document.querySelector('.PageViewer');
const pageWrapper = document.getElementById('pageWrapper');

class ZoomStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      marginLeft: null,
      marginTop: null,
      ratioX: null,
      ratioY: null,
      scrollLeft: null,
      scrollTop: null,
      zoomLevel: 100
    };
  }

  getAll = () => this.state;

  getZoomLevel = () => this.state.zoomLevel;

  setMargins = () => {
    const { zoomLevel } = this.state;

    // Center Points X || Y
    const cPX = pageViewer.scrollLeft + pageViewer.clientWidth / 2;
    const cPY = pageViewer.scrollTop + pageViewer.clientHeight / 2;

    // Position Ratios to whole
    const ratioX = cPX / pageWrapper.clientWidth;
    const ratioY = cPY / pageWrapper.clientHeight;

    const marginLeft = (zoomLevel < 100) ? `${(100 - zoomLevel) / 2}%` : 0;
    const marginTop =(
      pageViewer.clientHeight > pageWrapper.clientHeight
        ? `${(pageViewer.clientHeight - pageWrapper.clientHeight) / 2}px`
        : 0
    );

    const scrollLeft = (
      pageWrapper.clientWidth * ratioY - pageViewer.clientWidth / 2
    );

    const scrollTop = (
      pageWrapper.clientHeight * ratioX - pageViewer.clientHeight / 2
    );

    this.state = {
      marginLeft,
      marginTop,
      ratioX,
      ratioY,
      scrollLeft,
      scrollTop,
      zoomLevel,
    };
    this.emit('change');
  };

  setZoomLevel = value => {
    this.state.zoomLevel = Number(value);
    this.setMargins();
  };

  handleActions = (action) => {
    switch (action.type) {
      case SET_ZOOM_LEVEL:
        this.setZoomLevel(action.value);
        break;
    }
  }
}

const zoomStore = new ZoomStore;
dispatcher.register(zoomStore.handleActions.bind(zoomStore));
export default zoomStore;
