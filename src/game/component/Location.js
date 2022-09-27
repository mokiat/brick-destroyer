import Vector from '../../math/Vector';

class Location {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.location = cfg.location;
    } else {
      this.location = new Vector();
    }
  }
}

export default Location;
