describe("Entity-Component-System Core", function() {
  var manager;

  beforeEach(function() {
    manager = new brickdest.ecs.EntityManager();
  });

  describe("EntityManager", function() {
    it("is possible to create entities", function() {
      var entity = manager.createEntity();
      expect(entity).toBeDefined();
    });

    describe("when a listener is subscribed for events", function() {
      var matchingEntity;
      var nonmatchingEntity;
      var listener;
      var event;

      beforeEach(function() {
        matchingEntity = manager.createEntity();
        matchingEntity.addComponent("location", {});
        matchingEntity.addComponent("motion", {});

        nonmatchingEntity = manager.createEntity();
        nonmatchingEntity.addComponent("location", {});

        listener = {
          onEvent: function(entity, event) {
          }
        }
        spyOn(listener, 'onEvent');

        manager.subscribe(["location", "motion"], listener.onEvent);

        event = new brickdest.ecs.IEvent();
      });

      describe("when a listener is no longer subscribed", function() {
        beforeEach(function() {
          manager.unsubscribe(listener.onEvent);
        });

        describe("when a previously matching entity throws an event", function() {
          beforeEach(function() {
            matchingEntity.throwEvent(event);
          });

          it("the listener should not have been notified", function() {
            expect(listener.onEvent).not.toHaveBeenCalled();
          });
        });
      });

      describe("when a matching entity throws an event", function() {
        beforeEach(function() {
          matchingEntity.throwEvent(event);
        });

        it("the listener should have been called", function() {
          expect(listener.onEvent).toHaveBeenCalledWith(matchingEntity, event);
        });
      });

      describe("when a non-matching entity throws an event", function() {
        beforeEach(function() {
          nonmatchingEntity.throwEvent(event);
        });

        it("the listener should not have been notified", function() {
          expect(listener.onEvent).not.toHaveBeenCalled();
        });
      });
    });

    describe("when multiple entities are created", function() {
      var firstEntity;
      var secondEntity;

      beforeEach(function() {
        firstEntity = manager.createEntity();
        secondEntity = manager.createEntity();
      });

      it("is possible to list those entities", function() {
        var entities = manager.listEntities();
        expect(entities).toContain(firstEntity);
        expect(entities).toContain(secondEntity);
      });

      describe("when an entity is deleted", function() {
        beforeEach(function() {
          manager.deleteEntity(firstEntity);
        });

        it("that entity is no longer accessible", function() {
          var entities = manager.listEntities();
          expect(entities).not.toContain(firstEntity);
        });

        it("other entities are still accessible", function() {
          var entities = manager.listEntities();
          expect(entities).toContain(secondEntity);
        });
      });

      describe("when all entities are deleted", function() {
        beforeEach(function() {
          manager.deleteAllEntities();
        });

        it("manager holds zero entities", function() {
          var entities = manager.listEntities();
          expect(entities.length).toEqual(0);
        });
      });
    });

    describe("entity filtration", function() {
      var firstEntity;
      var secondEntity;
      var thirdEntity;
      var firstComponent;
      var secondComponent;

      beforeEach(function() {
        firstComponent = {"id": "first"};
        secondComponent = {"id": "second"};

        firstEntity = manager.createEntity();
        firstEntity.addComponent("location", firstComponent);

        secondEntity = manager.createEntity();
        secondEntity.addComponent("motion", secondComponent);

        thirdEntity = manager.createEntity();
        thirdEntity.addComponent("location", firstComponent);
        thirdEntity.addComponent("motion", secondComponent);
      });

      it("is possible to get only specific entities", function() {
        var entities = manager.filterEntities(["location"]);
        expect(entities.length).toEqual(2);
        expect(entities).toContain(firstEntity);
        expect(entities).toContain(thirdEntity);

        entities = manager.filterEntities(["motion"]);
        expect(entities.length).toEqual(2);
        expect(entities).toContain(secondEntity);
        expect(entities).toContain(thirdEntity);

        entities = manager.filterEntities(["location", "motion"]);
        expect(entities.length).toEqual(1);
        expect(entities).toContain(thirdEntity);
      });
    });
  });

  describe("Entity", function() {
    var entity;

    beforeEach(function() {
      entity = manager.createEntity();
    });

    it("the entity has an id", function() {
      expect(entity.id).not.toBeNull();
    });

    it("has a unique id", function() {
      var otherEntity = manager.createEntity();
      expect(otherEntity.id).not.toEqual(entity.id);
    });

    it("is not destroyed by default", function() {
      expect(entity.isDestroyed()).toBeFalsy();
    });

    describe("when entity is destroyed", function() {
      beforeEach(function() {
        entity.destroy();
      });

      it("entity is destroyed", function() {
        expect(entity.isDestroyed()).toBeTruthy();
      });

      it("is no longer registered in the manager", function() {
        var entities = manager.listEntities();
        expect(entities).not.toContain(entity);
      });

      // TODO: Verify that a destroy event is thrown.
    });

    describe("when components are added", function() {
      var firstComponent;
      var secondComponent;

      beforeEach(function() {
        firstComponent = {"id": "first"};
        entity.addComponent("location", firstComponent);

        secondComponent = {"id": "second"};
        entity.addComponent("motion", secondComponent);
      });

      it("is possible to check whether it has given components", function() {
        expect(entity.hasComponent("location")).toBeTruthy();
        expect(entity.hasComponent("motion")).toBeTruthy();
        expect(entity.hasComponent("missing")).toBeFalsy();
      });

      it("is possible to access these components", function() {
        expect(entity.getComponent("location")).toEqual(firstComponent);
        expect(entity.getComponent("motion")).toEqual(secondComponent);
      });

      describe("when component is removed", function() {
        beforeEach(function() {
          entity.removeComponent("location");
        });

        it("component is no longer accessible", function() {
          expect(entity.getComponent("location")).toBeUndefined();
        });

        it("other components are still accessible", function() {
          expect(entity.getComponent("motion")).toEqual(secondComponent);
        });
      });
    });
  });

  describe("System", function() {
    var firstSystem;
    var secondSystem;

    beforeEach(function() {
      firstSystem = new brickdest.ecs.ISystem();
      spyOn(firstSystem, 'update');
      manager.addSystem(firstSystem);

      secondSystem = new brickdest.ecs.ISystem();
      spyOn(secondSystem, 'update');
      manager.addSystem(secondSystem);
    });

    describe("when EntityManager is updated", function() {
      beforeEach(function() {
        manager.update(1.5);
      });

      it("all systems are updated", function() {
        expect(firstSystem.update).toHaveBeenCalledWith(1.5);
        expect(secondSystem.update).toHaveBeenCalledWith(1.5);
      });
    });
  });
});
