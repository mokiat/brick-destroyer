describe("DestroyOnHitSystem", function() {
  var manager;
  var system;
  var entity;
  var obstacle;

  beforeEach(function() {
    manager = new ecs.EntityManager();
    system = new game.DestroyOnHitSystem(manager);

    entity = manager.createEntity();
    entity.addComponent("collision", new game.CollisionComponent());
    entity.addComponent("destroyOnHit", new game.DestroyOnHitComponent());

    obstacle = manager.createEntity();
    obstacle.addComponent("collision", new game.CollisionComponent());
  });

  describe("when entity collides with obstacle", function() {
    beforeEach(function() {
      entity.throwEvent(new game.CollisionEvent({
        obstacle: obstacle,
        collisionNormal: new math.Vector()
      }));
    });

    it("the entity is destroyed", function() {
      expect(entity.isDestroyed()).toBeTruthy();
    });

    it("obstacle is not destroyed if not destroy on hit", function() {
      expect(obstacle.isDestroyed()).toBeFalsy();
    });
  });
});
