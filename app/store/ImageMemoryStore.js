import {EventEmitter} from 'events';

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

  getImages = () => (this.state);

  generateImages = (pages) => {
    const images = renderImages(pages);
    this.setImages(images);
  };

  setImages = (images) => {
    this.state = {images};
    this.emit('change');
  };
}

const imageMemoryStore = new ImageMemoryStore;

export default imageMemoryStore;
