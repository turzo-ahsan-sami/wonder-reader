import { EventEmitter } from 'events';

import {
  CLOSE_LIBRARY,
  OPEN_LIBRARY
} from '../constants';
import dispatcher from '../dispatcher';

class TopStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      top: false,
    };
  }

  closeTopDrawer() {
    this.state.top = false;
    this.emit('change');
  }

  getTopValue() {
    return this.state.top;
  }

  openTopDrawer() {
    this.state.top = true;
    this.emit('change');
  }

  toggleTopDrawer() {
    this.state.top = !this.state.top;
    this.emit('change');
  }

  handleActions = (action) => {
    switch(action.type) {
      case CLOSE_LIBRARY:
        this.closeTopDrawer();
        break;
      case OPEN_LIBRARY:
        this.openTopDrawer();
        break;
    }
  }
}

const topStore = new TopStore;
dispatcher.register(topStore.handleActions.bind(topStore));
export default topStore;
