class TimerDestroy {
  constructor(cfg) {
    if (cfg !== undefined) {
      this.timeout = cfg.timeout;
    } else {
      this.timeout = 10.0;
    }
  }
}

export default TimerDestroy;
