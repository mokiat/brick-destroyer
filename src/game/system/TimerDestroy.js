class TimerDestroy {
  constructor(manager) {
    this.manager = manager;
  }

  update(elapsedSeconds) {
    const entities = this.manager.filterEntities(['timerDestroy']);
    for (const entity of entities) {
      this.updateEntityTimer(entity, elapsedSeconds);
    }
  }

  updateEntityTimer(entity, elapsedSeconds) {
    const timerDestroyComp = entity.getComponent('timerDestroy');
    timerDestroyComp.timeout -= elapsedSeconds;
    if (timerDestroyComp.timeout <= 0.0) {
      entity.destroy();
    }
  }
}

export default TimerDestroy;
