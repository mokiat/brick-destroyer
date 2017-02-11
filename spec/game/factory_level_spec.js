describe("LevelFactory", function() {
  var decimalPoints = 4;
  var entityFactory;
  var resourceCollection;
  var factory;

  beforeEach(function() {
    entityFactory = new Object();
    entityFactory.createEntity = jasmine.createSpy('createEntity');

    resourceCollection = new resources.Collection();

    factory = new game.LevelFactory(entityFactory,resourceCollection);
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

  describe("when a level with images is applied", function() {
    beforeEach(function() {
      factory.applyLevel({
        "images" : {
          "ball" : "/resources/img/ball",
          "brick" : "/resources/img/brick"
        }
      });
    });

    it("the images should have been registered in the resource collection", function() {
      var ballImage = resourceCollection.find("ball");
      expect(ballImage).toBeDefined();
      expect(ballImage).not.toBeNull();
      expect(ballImage.getPath()).toEqual("/resources/img/ball");

      var brickImage = resourceCollection.find("brick");
      expect(brickImage).toBeDefined();
      expect(brickImage).not.toBeNull();
      expect(brickImage.getPath()).toEqual("/resources/img/brick");
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
      expect(entityFactory.createEntity.calls.count()).toEqual(1);
      expect(entityFactory.createEntity.calls.argsFor(0)).toEqual([{}]);
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
      expect(entityFactory.createEntity.calls.count()).toEqual(1);
      expect(entityFactory.createEntity.calls.argsFor(0)).toEqual([{
        "location" : {
          "x" : 1.2,
          "y" : 7.4
        },
        "solid" : {
        }
      }]);
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
      expect(entityFactory.createEntity.calls.count()).toEqual(2);
      expect(entityFactory.createEntity.calls.argsFor(0)).toEqual([{
        "location" : {
          "x" : 1.2,
          "y" : 7.4
        }
      }]);
      expect(entityFactory.createEntity.calls.argsFor(1)).toEqual([{
        "sprite" : {
          "image" : "monkey"
        }
      }]);
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
      expect(entityFactory.createEntity.calls.count()).toEqual(1);
      expect(entityFactory.createEntity.calls.argsFor(0)).toEqual([{
        "location" : {
          "x" : 1.2,
          "y" : 7.4
        },
        "sprite" : {
          "image" : "donkey"
        }
      }]);
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
      expect(entityFactory.createEntity.calls.count()).toEqual(1);
      expect(entityFactory.createEntity.calls.argsFor(0)).toEqual([{
        "location" : {
          "x" : 1.2,
          "y" : 7.4
        },
        "sprite" : {
          "image" : "donkey"
        }
      }]);
    });
  });
});
