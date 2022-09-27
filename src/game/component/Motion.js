import Vector from '../../math/Vector';

class Motion {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.speed = cfg.speed;
    } else {
      this.speed = new Vector();
    }
  }
}

export default Motion;
