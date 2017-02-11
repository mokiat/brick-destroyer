(function(ns, undefined) {

  ns.Resource = function() {
    this.loaded = false;
  };

  ns.Resource.prototype.setLoaded = function(loaded) {
    this.loaded = loaded;
  };

  ns.Resource.prototype.isLoaded = function() {
    return this.loaded;
  };


  ns.Collection = function() {
    this.resources = {};
  };

  ns.Collection.prototype.register = function(name, resource) {
    this.resources[name] = resource;
  };

  ns.Collection.prototype.unregister = function(name) {
    delete this.resources[name];
  };

  ns.Collection.prototype.find = function(name) {
    return this.resources[name];
  };

  ns.Collection.prototype.isLoaded = function() {
    for (var name in this.resources) {
      var resource = this.resources[name];
      if (!resource.isLoaded()) {
        return false;
      }
    }
    return true;
  };


  ns.RemoteJSONResource = function(path) {
    ns.Resource.call(this);
    this.data = null;
    $.get(path, $.proxy(this._onDataReceived, this), "json");
  };

  ns.RemoteJSONResource.prototype = Object.create(ns.Resource.prototype);

  ns.RemoteJSONResource.prototype.getData = function() {
    return this.data;
  };

  ns.RemoteJSONResource.prototype._onDataReceived = function(data) {
    this.data = data;
    this.setLoaded(true);
  };

})(window.resources = window.resources || {});
