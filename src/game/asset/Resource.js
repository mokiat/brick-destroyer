class Resource {
  constructor() {
    this.loaded = false;
  }

  setLoaded(loaded) {
    this.loaded = loaded;
  }

  get isLoaded() {
    return this.loaded;
  }
}

export default Resource;
