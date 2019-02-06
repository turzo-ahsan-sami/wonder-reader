import { EventEmitter } from 'events';

import {
  CLOSE_LIBRARY,
  OPEN_LIBRARY,
  TOGGLE_LIBRARY,
} from '../constants';
import dispatcher from '../dispatcher';

class TopStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      top: false,
    };
  }

  closeTopDrawer = () => {
    this.handleBoolean(false);
  };

  getTopValue = () => (this.state.top);

  handleBoolean = bool => {
    this.state.top = bool;
    this.emit('change');
  };

  openTopDrawer = () => {
    this.handleBoolean(true);
  };

  toggleTopDrawer = () => {
    const { top } = this.state;
    this.handleBoolean(!top);
  };

  handleActions = (action) => {
    switch(action.type) {
      case CLOSE_LIBRARY:
        this.closeTopDrawer();
        break;
      case OPEN_LIBRARY:
        this.openTopDrawer();
        break;
      case TOGGLE_LIBRARY:
        this.toggleTopDrawer();
        break;
    }
  }
}

const topStore = new TopStore;
dispatcher.register(topStore.handleActions.bind(topStore));
export default topStore;
