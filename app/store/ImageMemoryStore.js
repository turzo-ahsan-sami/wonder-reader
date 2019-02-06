import { EventEmitter } from 'events';

import { SET_IMAGES } from '../constants';
import dispatcher from '../dispatcher';

const generateImageMemory = page => {
  const img = new Image();
  img.src = page.encodedPagePath;
  return img;
};

const renderImages = pages => pages.map(generateImageMemory);

class ImageMemoryStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      images: []
    };
  }

  generateImages = (pages) => {
    const images = renderImages(pages);
    this.setImages(images);
  };

  getImages = () => this.state;

  setImages = (images) => {
    this.state = {images};
    this.emit('change');
  };

  handleActions = (action) => {
    switch(action.type) {
      case SET_IMAGES:
        this.setImages(action.images);
        break;
    }
  };
}

const imageMemoryStore = new ImageMemoryStore;
dispatcher.register(imageMemoryStore.handleActions.bind(imageMemoryStore));
export default imageMemoryStore;
