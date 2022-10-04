class SpawnOnDestroy {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.definition = cfg.definition;
    } else {
      this.definition = {};
    }
  }
}

export default SpawnOnDestroy;
