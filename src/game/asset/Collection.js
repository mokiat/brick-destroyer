class Collection {
  constructor() {
    this.resources = {};
  }

  register(name, resource) {
    this.resources[name] = resource;
  }

  unregister(name) {
    delete this.resources[name];
  }

  find(name) {
    return this.resources[name];
  }

  get isLoaded() {
    for (let name in this.resources) {
      const resource = this.resources[name];
      if (!resource.isLoaded) {
        return false;
      }
    }
    return true;
  }
}

export default Collection;
