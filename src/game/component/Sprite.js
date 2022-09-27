class Sprite {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.image = cfg.image;
      this.width = cfg.width;
      this.height = cfg.height;
    } else {
      this.image = null;
      this.width = 0;
      this.height = 0;
    }
  }
}

export default Sprite;
