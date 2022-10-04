class LocationBound {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.minX = cfg.minX;
      this.maxX = cfg.maxX;
      this.minY = cfg.minY;
      this.maxY = cfg.maxY;
    } else {
      this.minX = -5000.0;
      this.maxX = 5000.0;
      this.minY = -5000.0;
      this.maxY = 5000.0;
    }
  }
}

export default LocationBound;
