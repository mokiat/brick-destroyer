import Resource from '../asset/Resource';

class GraphicsImage extends Resource {
  constructor(path) {
    super();
    this.path = path;
    this.img = new Image();
    this.img.src = path;
    this.img.onload = () => {
      this.setLoaded(true);
    };
  }

  getPath() {
    return this.path;
  }

  getImg() {
    return this.img;
  }
}

export default GraphicsImage;
