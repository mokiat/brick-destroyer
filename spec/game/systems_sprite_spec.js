describe("SpriteRenderSystem", function() {
  var manager;
  var entity;
  var system;
  var renderer;
  var image;

  beforeEach(function() {
    manager = new ecs.EntityManager();

    renderer = new Object();
    renderer.drawScaledImage = jasmine.createSpy('drawScaledImage');

    image = new resources.Resource();

    system = new game.SpriteRenderSystem(manager, renderer);
    manager.addSystem(system);

    entity = manager.createEntity();

    entity.addComponent("location", new game.LocationComponent({
      location: new math.Vector(5.4, 4.6)
    }));

    entity.addComponent("sprite", new game.SpriteComponent({
      width: 64,
      height: 32,
      image: image
    }));
  });

  describe("when updated", function() {
    beforeEach(function() {
      manager.update(1.0);
    });

    it("entities are renderered", function() {
      expect(renderer.drawScaledImage).toHaveBeenCalledWith(image, -27, -12, 64, 32);
    });
  });
});
