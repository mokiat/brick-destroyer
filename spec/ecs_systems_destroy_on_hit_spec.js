describe("DestroyOnHitSystem", function() {
  var manager;
  var system;
  var entity;
  var obstacle;

  beforeEach(function() {
    manager = new brickdest.ecs.EntityManager();
    system = new brickdest.ecs.DestroyOnHitSystem(manager);

    entity = manager.createEntity();
    entity.addComponent("collision", new brickdest.ecs.CollisionComponent());
    entity.addComponent("destroyOnHit", new brickdest.ecs.DestroyOnHitComponent());

    obstacle = manager.createEntity();
    obstacle.addComponent("collision", new brickdest.ecs.CollisionComponent());
  });

  describe("when entity collides with obstacle", function() {
    beforeEach(function() {
      entity.throwEvent(new brickdest.ecs.CollisionEvent({
        obstacle: obstacle,
        collisionNormal: new brickdest.math.Vector()
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
