(function(ns, undefined) {

  ns.Image = function(path) {
    resources.Resource.call(this);
    this.path = path;
    this.img = new Image();
    this.img.src = path;
    this.img.onload = $.proxy(function() {
      this.setLoaded(true);
    }, this);
  };

  ns.Image.prototype = Object.create(resources.Resource.prototype);

  ns.Image.prototype.getPath = function() {
    return this.path;
  };

  ns.Image.prototype.getImg = function() {
    return this.img;
  };


  ns.Renderer = function(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
  };

  ns.Renderer.prototype.clear = function() {
    this.context.clearRect(0, 0, this.width, this.height);
  };

  ns.Renderer.prototype.drawImage = function(image, x, y) {
    var width = image.getImg().width;
    var height = image.getImg().height;
    this.context.drawImage(image.getImg(), x - width / 2, y - height / 2, width, height);
  };

  ns.Renderer.prototype.drawScaledImage = function(image, left, top, width, height) {
    this.context.drawImage(image.getImg(), left, top, width, height);
  };

})(window.graphics = window.graphics || {});
