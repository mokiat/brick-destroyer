oop.namespace("brickdest.ecs");

brickdest.ecs.SpriteRenderSystem = oop.class({
  __create__: function(manager, renderer) {
    this.manager = manager;
    this.renderer = renderer;
  },
  update: function(elapsedSeconds) {
    var entities = this.manager.filterEntities(["location", "sprite"]);
    for (var i = 0; i < entities.length; i++) {
      this.renderEntity(entities[i]);
    }
  },
  renderEntity: function(entity) {
    var location = entity.getComponent("location");
    var sprite = entity.getComponent("sprite");
    var width = sprite.width;
    var height = sprite.height;
    var left = Math.floor(location.x) - width / 2;
    var top = Math.floor(location.y) - height / 2;
    this.renderer.drawScaledImage(sprite.image, left, top, width, height);
  }
});
