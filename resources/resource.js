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

brickdest.resource.RemoteJSONResource = oop.class(brickdest.resource.Resource, {
  __create__: function(path) {
    this.__super__();
    this.data = null;
    $.get(path, $.proxy(this.onDataReceived, this), "json");
  },
  onDataReceived: function(data) {
    this.data = data;
    this.setLoaded(true);
  },
  getData: function() {
    return this.data;
  }
});

brickdest.resource.Collection = oop.class({
  __create__: function() {
    this.resources = {};
  },
  register: function(name, resource) {
    this.resources[name] = resource;
  },
  unregister: function(name) {
    delete this.resources[name];
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
  }
});
