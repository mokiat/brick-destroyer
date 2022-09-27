class ExplodeOnDestroy {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.explosionRadius = cfg.explosionRadius;
    } else {
      this.explosionRadius = 100.0;
    }
  }
}

export default ExplodeOnDestroy;
