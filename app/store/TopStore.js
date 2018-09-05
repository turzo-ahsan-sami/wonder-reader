import { EventEmitter } from 'events';

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
}

const topStore = new TopStore;

export default topStore;
