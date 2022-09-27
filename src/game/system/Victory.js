class Victory {
  constructor(manager) {
    this.manager = manager;
    this.triggered = false;
  }

  update(elapsedSeconds) {
    var entities = this.manager.filterEntities(['shouldDestroy']);
    this.triggered = entities.length === 0;
  }

  get isTriggered() {
    return this.triggered;
  }

  reset() {
    this.triggered = false;
  }
}

export default Victory;
