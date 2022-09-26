class Rectangle {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.width = cfg.width;
      this.height = cfg.height;
    } else {
      this.width = 2.0;
      this.height = 1.0;
    }
  }

  get halfWidth() {
    return this.width / 2.0;
  }

  get halfHeight() {
    return this.height / 2.0;
  }

  get closestPointDistance() {
    if (this.width < this.height) {
      return this.halfWidth;
    } else {
      return this.halfHeight;
    }
  }

  get furthestPointDistance() {
    const distanceSquared =
      this.halfWidth * this.halfWidth + this.halfHeight * this.halfHeight;
    return Math.sqrt(distanceSquared);
  }
}

export default Rectangle;
