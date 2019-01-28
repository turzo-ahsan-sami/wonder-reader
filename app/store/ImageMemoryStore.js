import {EventEmitter} from 'events';

import { SET_IMAGES } from '../constants';
import dispatcher from '../dispatcher';

const generateImageMemory = page => {
  const img = new Image();
  img.src = page.encodedPagePath;
  return img;
};

class ImageMemoryStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      images: []
    };
  }

  generateImages = (pages) => {
    const images = this.renderImages(pages);
    this.setImages(images);
  }

  getImages = () => (this.state)

  renderImages = (pages) => (
    pages.map(generateImageMemory)
  )

  setImages = (images) => {
    this.state = {images};
    this.emit('change');
  }

  handleActions = (action) => {
    switch(action.type) {
      case SET_IMAGES:
        this.setImages(action.images);
        break;
    }
  }
}

const imageMemoryStore = new ImageMemoryStore;
dispatcher.register(imageMemoryStore.handleActions.bind(imageMemoryStore));
export default imageMemoryStore;
