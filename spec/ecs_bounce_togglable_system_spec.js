describe("BounceTogglableSystem", function() {
  var decimalPoints = 4;
  var manager;
  var system;
  var entity;
  var otherEntity;
  var activeImage;
  var inactiveImage;

  beforeEach(function() {
    manager = new brickdest.ecs.EntityManager();
    system = new brickdest.ecs.BounceTogglableSystem(manager);
    manager.addSystem(system);

    activeImage = new brickdest.graphics.IImage();
    inactiveImage = new brickdest.graphics.IImage();

    entity = manager.createEntity();
    entity.addComponent("location", new brickdest.ecs.LocationComponent());
    entity.addComponent("collision", new brickdest.ecs.CollisionComponent());
    entity.addComponent("bounceTogglable", new brickdest.ecs.BounceTogglableComponent({
      activeImage: activeImage,
      inactiveImage: inactiveImage,
      deflection: new brickdest.math.Vector(2.0, 2.0)
    }));
    entity.addComponent("sprite", new brickdest.ecs.SpriteComponent());

    otherEntity = manager.createEntity();
    otherEntity.addComponent("location", new brickdest.ecs.LocationComponent({
      location: new brickdest.math.Vector(4.0, -2.0)
    }));
    otherEntity.addComponent("motion", new brickdest.ecs.MotionComponent({
      speed: new brickdest.math.Vector(1.0, -1.0)
    }));

    manager.update(1.0);
  });

  it("by default system is not toggled", function() {
    expect(system.isToggled()).toBeFalsy();
  });

  it("the entity has the inactive image set", function() {
    var spriteComp = entity.getComponent("sprite");
    expect(spriteComp.image).toBe(inactiveImage);
  });

  describe("when an entity collides with the togglable one", function() {
    beforeEach(function() {
      entity.throwEvent(new brickdest.ecs.CollisionEvent({
        obstacle: otherEntity,
        collisionNormal: new brickdest.math.Vector(0.0, -1.0)
      }));
    });

    it("the entity should have changed it's horizontal speed", function() {
      var motionComp = otherEntity.getComponent("motion");
      expect(motionComp.speed.x).toBeCloseTo(9.0, decimalPoints);
      expect(motionComp.speed.y).toBeCloseTo(-1.0, decimalPoints);
    });
  });

  describe("when system is toggled", function() {
    beforeEach(function() {
      system.setToggled(true);
      manager.update(1.0);
    });

    it("the system is toggled", function() {
      expect(system.isToggled()).toBeTruthy();
    });

    it("the entity has the active image set", function() {
      var spriteComp = entity.getComponent("sprite");
      expect(spriteComp.image).toBe(activeImage);
    });

    describe("when an entity collides with the togglable one", function() {
      beforeEach(function() {
        entity.throwEvent(new brickdest.ecs.CollisionEvent({
          obstacle: otherEntity,
          collisionNormal: new brickdest.math.Vector(0.0, -1.0)
        }));
      });

      it("the entity should not have changed it's horizontal and vertical speed", function() {
        var motionComp = otherEntity.getComponent("motion");
        expect(motionComp.speed.x).toBeCloseTo(9.0, decimalPoints);
        expect(motionComp.speed.y).toBeCloseTo(-5.0, decimalPoints);
      });
    });

    describe("when the system is untoggled", function() {
      beforeEach(function() {
        system.setToggled(false);
        manager.update(1.0);
      });

      it("system is back to untoggled state", function() {
        expect(system.isToggled()).toBeFalsy();
      });
    });
  });
});
