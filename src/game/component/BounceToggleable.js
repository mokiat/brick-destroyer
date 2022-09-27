import Vector from '../../math/Vector';

class BounceToggleable {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.activeImage = cfg.activeImage;
      this.inactiveImage = cfg.inactiveImage;
      this.deflection = cfg.deflection;
    } else {
      this.activeImage = null;
      this.inactiveImage = null;
      this.deflection = new Vector(0.1, 0.1);
    }
  }
}

export default BounceToggleable;
