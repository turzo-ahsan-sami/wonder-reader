import { EventEmitter} from 'events';

import initState from './initState';

class Store extends EventEmitter{
  constructor() {
    super();
    this.state = initState;
  }

  getAll() {
    return this.state;
  }

  getTop(value) {
    return this.state[value];
  }
}

const store = new Store;

export default store;
