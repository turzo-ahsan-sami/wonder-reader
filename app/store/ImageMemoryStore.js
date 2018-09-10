import {EventEmitter} from 'events';

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

  getImages() {
    return this.state;
  }
  generateImages(pages) {
    const images = this.renderImages(pages);
    this.setImages(images);
  }
  renderImages(pages) {
    return pages.map(generateImageMemory);
  }
  setImages(images) {
    this.state = {images};
    this.emit('change');
  }
}

const imageMemoryStore = new ImageMemoryStore;

export default imageMemoryStore;
