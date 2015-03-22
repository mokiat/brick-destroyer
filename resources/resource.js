oop.namespace("brickdest.resource");

brickdest.resource.Resource = oop.class({
  __create__: function() {
    this.loaded = false;
  },
  setLoaded: function(loaded) {
    this.loaded = loaded;
  },
  isLoaded: function() {
    return this.loaded;
  }
});

brickdest.resource.Collection = oop.class({
  __create__: function() {
    this.resources = {};
  },
  register: function(name, resource) {
    this.resources[name] = resource;
  },
  find: function(name) {
    return this.resources[name];
  },
  isLoaded: function() {
    for (name in this.resources) {
      var resource = this.resources[name];
      if (!resource.isLoaded()) {
        return false;
      }
    }
    return true;
  },
  isLoading: function() {
    return !this.isLoaded();
  }
});
