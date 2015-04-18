describe("Entity-Component-System Systems", function() {
  var manager;
  var entity;
  var system;

  beforeEach(function() {
    manager = new brickdest.ecs.EntityManager();
    entity = manager.createEntity();
  });

  describe("SpriteRenderSystem", function() {
    var renderer;
    var image;

    beforeEach(function() {
      renderer = new brickdest.graphics.IRenderer();
      spyOn(renderer, 'drawScaledImage');

      image = new brickdest.graphics.IImage();

      system = new brickdest.ecs.SpriteRenderSystem(manager, renderer);
      manager.addSystem(system);

      var location = new brickdest.ecs.LocationComponent();
      location.x = 5.3;
      location.y = 4.6;
      entity.addComponent("location", location);

      var sprite = new brickdest.ecs.SpriteComponent();
      sprite.width = 64;
      sprite.height = 32;
      sprite.image = image;
      entity.addComponent("sprite", sprite);
    });

    describe("when updated", function() {
      beforeEach(function() {
        manager.update(1.0);
      });

      it("entities are renderered on update", function() {
        expect(renderer.drawScaledImage).toHaveBeenCalledWith(image, -27, -12, 64, 32);
      });
    });
  });
});
