describe("BounceToggleableSystem", function() {
  var decimalPoints = 4;
  var manager;
  var system;
  var entity;
  var otherEntity;
  var activeImage;
  var inactiveImage;

  beforeEach(function() {
    manager = new ecs.EntityManager();
    system = new game.BounceToggleableSystem(manager);
    manager.addSystem(system);

    activeImage = new resources.Resource();
    inactiveImage = new resources.Resource();

    entity = manager.createEntity();
    entity.addComponent("location", new game.LocationComponent());
    entity.addComponent("collision", new game.CollisionComponent());
    entity.addComponent("bounceToggleable", new game.BounceToggleableComponent({
      activeImage: activeImage,
      inactiveImage: inactiveImage,
      deflection: new math.Vector(2.0, 2.0)
    }));
    entity.addComponent("sprite", new game.SpriteComponent());

    otherEntity = manager.createEntity();
    otherEntity.addComponent("location", new game.LocationComponent({
      location: new math.Vector(4.0, -2.0)
    }));
    otherEntity.addComponent("motion", new game.MotionComponent({
      speed: new math.Vector(1.0, -1.0)
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

  describe("when an entity collides with the toggleable one", function() {
    beforeEach(function() {
      entity.throwEvent(new game.CollisionEvent({
        obstacle: otherEntity,
        collisionNormal: new math.Vector(0.0, -1.0)
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

    describe("when an entity collides with the toggleable one", function() {
      beforeEach(function() {
        entity.throwEvent(new game.CollisionEvent({
          obstacle: otherEntity,
          collisionNormal: new math.Vector(0.0, -1.0)
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
