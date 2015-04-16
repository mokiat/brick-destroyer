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

    describe("when components are added", function() {
      var firstComponent;
      var secondComponent;

      beforeEach(function() {
        firstComponent = {"id": "first"};
        entity.addComponent("location", firstComponent);

        secondComponent = {"id": "second"};
        entity.addComponent("motion", secondComponent);
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
});
