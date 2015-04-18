oop.namespace("brickdest.graphics");

brickdest.graphics.IImage = oop.interface({
  getImg: function() {}
});

brickdest.graphics.Image = oop.class(brickdest.resource.Resource, {
  __create__: function(path) {
    this.__super__();
    this.img = new Image();
    this.img.src = path;
    this.img.onload = $.proxy(function() {
      this.setLoaded(true);
    }, this);
  },
  getImg: function() {
    return this.img;
  }
});

brickdest.graphics.IRenderer = oop.interface({
  clear: function() {},
  drawImage: function(image, x, y) {},
  drawScaledImage: function(image, left, top, width, height) {}
});

brickdest.graphics.Renderer = oop.class({
  __create__: function(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
  },
  clear: function() {
    this.context.clearRect(0, 0, this.width, this.height);
  },
  drawImage: function(image, x, y) {
    var width = image.getImg().width;
    var height = image.getImg().height;
    this.context.drawImage(image.getImg(), x - width / 2, y - height / 2, width, height);
  },
  drawScaledImage: function(image, left, top, width, height) {
    this.context.drawImage(image.getImg(), left, top, width, height);
  }
});
