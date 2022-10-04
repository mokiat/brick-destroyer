class Circle {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.radius = cfg.radius;
    } else {
      this.radius = 1.0;
    }
  }

  get closestPointDistance() {
    return this.radius;
  }

  get furthestPointDistance() {
    return this.radius;
  }
}

export default Circle;
