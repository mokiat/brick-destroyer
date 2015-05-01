describe("LevelFactory", function() {
  var decimalPoints = 4;
  var entityFactory;
  var factory;

  beforeEach(function() {
    entityFactory = new brickdest.ecs.IEntityFactory();
    spyOn(entityFactory, 'createEntity');

    factory = new brickdest.ecs.LevelFactory(entityFactory);
  });

  describe("when an empty level is applied", function() {
    beforeEach(function() {
      factory.applyLevel({
      });
    });

    it("EntityManager is not used", function() {
      expect(entityFactory.createEntity).not.toHaveBeenCalled();
    });
  });

  describe("when a level with an empty entity is applied", function() {
    beforeEach(function() {
      factory.applyLevel({
        "entities" : [
          {}
        ]
      });
    });

    it("EntityManager is called with an empty definition", function() {
      expect(entityFactory.createEntity.calls.length).toEqual(1);
      expect(entityFactory.createEntity.calls[0].args[0]).toEqual({});
    });
  });

  describe("when a level with an entity with components is applied", function() {
    beforeEach(function() {
      factory.applyLevel({
        "entities" : [
          {
            "location" : {
              "x" : 1.2,
              "y" : 7.4
            },
            "solid" : {
            }
          }
        ]
      });
    });

    it("EntityManager is called with the correct definition", function() {
      expect(entityFactory.createEntity.calls.length).toEqual(1);
      expect(entityFactory.createEntity.calls[0].args[0]).toEqual({
        "location" : {
          "x" : 1.2,
          "y" : 7.4
        },
        "solid" : {
        }
      });
    });
  });

  describe("when a level with multiple entities is applied", function() {
    beforeEach(function() {
      factory.applyLevel({
        "entities" : [
          {
            "location" : {
              "x" : 1.2,
              "y" : 7.4
            }
          },
          {
            "sprite" : {
              "image" : "monkey"
            }
          }
        ]
      });
    });

    it("EntityManager is called multiple times with the correct definitions", function() {
      expect(entityFactory.createEntity.calls.length).toEqual(2);
      expect(entityFactory.createEntity.calls[0].args[0]).toEqual({
        "location" : {
          "x" : 1.2,
          "y" : 7.4
        }
      });
      expect(entityFactory.createEntity.calls[1].args[0]).toEqual({
        "sprite" : {
          "image" : "monkey"
        }
      });
    });
  });

  describe("when a level with an entity with types is applied", function() {
    beforeEach(function() {
      factory.applyLevel({
        "types" : {
          "locatable" : {
            "location" : {
              "x" : 1.2,
              "y" : 7.4
            }
          },
          "drawable" : {
            "sprite" : {
              "image" : "donkey"
            }
          }
        },
        "entities" : [
          {
            "types" : ["locatable", "drawable"]
          }
        ]
      });
    });

    it("EntityManager is called with the correct definitions", function() {
      expect(entityFactory.createEntity.calls.length).toEqual(1);
      expect(entityFactory.createEntity.calls[0].args[0]).toEqual({
        "location" : {
          "x" : 1.2,
          "y" : 7.4
        },
        "sprite" : {
          "image" : "donkey"
        }
      });
    });
  });

  describe("when a level with an entity with transitive types is applied", function() {
    beforeEach(function() {
      factory.applyLevel({
        "types" : {
          "base" : {
            "location" : {
              "x" : 1.2,
              "y" : 7.4
            }
          },
          "derived" : {
            "types" : ["base"],
            "sprite" : {
              "image" : "donkey"
            }
          }
        },
        "entities" : [
          {
            "types" : ["derived"]
          }
        ]
      });
    });

    it("EntityManager is called with the correct definitions", function() {
      expect(entityFactory.createEntity.calls.length).toEqual(1);
      expect(entityFactory.createEntity.calls[0].args[0]).toEqual({
        "location" : {
          "x" : 1.2,
          "y" : 7.4
        },
        "sprite" : {
          "image" : "donkey"
        }
      });
    });
  });
});
