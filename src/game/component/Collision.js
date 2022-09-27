class Collision {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.mass = cfg.mass;
      this.friction = cfg.friction;
      this.deflection = cfg.deflection;
      this.shape = cfg.shape;
    } else {
      this.mass = 1.0;
      this.friction = 0.2;
      this.deflection = 0.8;
      this.shape = null;
    }
  }
}

export default Collision;
