class MouseBound {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.axisXBound = cfg.axisXBound;
      this.axisYBound = cfg.axisYBound;
    } else {
      this.axisXBound = true;
      this.axisYBound = true;
    }
  }
}

export default MouseBound;
