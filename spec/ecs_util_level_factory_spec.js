describe("LevelFactory", function() {
  var decimalPoints = 4;
  var manager;
  var resourceCollection;
  var system;
  var level;

  beforeEach(function() {
    manager = new brickdest.ecs.EntityManager();
    resourceCollection = new brickdest.resource.Collection();
    system = new brickdest.ecs.LevelFactory(manager, resourceCollection);
  });

  describe("when a level with an entity is loaded", function() {
    describe("when entity is empty", function() {
      beforeEach(function() {
        system.applyLevel({
          "entities": [
            {}
          ]
        });
      });

      it("should have been created", function() {
        var entities = manager.listEntities();
        expect(entities.length).toEqual(1);
      });
    });

    describe("when entity has location", function() {
      beforeEach(function() {
        system.applyLevel({
          "entities" : [
            {
              "location" : {
                "x" : 21.3,
                "y" : 36.7
              }
            }
          ]
        });
      });

      it("entity should have location component", function() {
        var entity = manager.listEntities()[0];
        expect(entity.hasComponent("location")).toBeTruthy();
        var component = entity.getComponent("location");
        expect(component.location.x).toBeCloseTo(21.3, decimalPoints);
        expect(component.location.y).toBeCloseTo(36.7, decimalPoints);
      });
    });

    describe("when entity has motion", function() {
      beforeEach(function() {
        system.applyLevel({
          "entities" : [
            {
              "motion" : {
                "speed" : {
                  "x" : 1.2,
                  "y" : 3.4
                }
              }
            }
          ]
        });
      });

      it("entity should have motion component", function() {
        var entity = manager.listEntities()[0];
        expect(entity.hasComponent("motion")).toBeTruthy();
        var component = entity.getComponent("motion");
        expect(component.speed.x).toBeCloseTo(1.2, decimalPoints);
        expect(component.speed.y).toBeCloseTo(3.4, decimalPoints);
      });
    });

    describe("when entity has circle collision", function() {
      beforeEach(function() {
        system.applyLevel({
          "entities" : [
            {
              "collision" : {
                "deflection" : 0.6,
                "friction" : 0.4,
                "mass" : 0.5,
                "shape_circle" : {
                  "radius" : 0.3
                }
              }
            }
          ]
        });
      });

      it("entity should have circle collision component", function() {
        var entity = manager.listEntities()[0];
        expect(entity.hasComponent("collision")).toBeTruthy();
        var component = entity.getComponent("collision");
        expect(component.deflection).toBeCloseTo(0.6, decimalPoints);
        expect(component.friction).toBeCloseTo(0.4, decimalPoints);
        expect(component.mass).toBeCloseTo(0.5, decimalPoints);
        expect(component.shape instanceof brickdest.shape.Circle).toBeTruthy();
        var shape = component.shape;
        expect(shape.radius).toBeCloseTo(0.3, decimalPoints);
      });
    });

    describe("when entity has rectangle collision", function() {
      beforeEach(function() {
        system.applyLevel({
          "entities" : [
            {
              "collision" : {
                "deflection" : 0.6,
                "friction" : 0.4,
                "mass" : 0.5,
                "shape_rectangle" : {
                  "width" : 81.3,
                  "height" : 35.2
                }
              }
            }
          ]
        });
      });

      it("entity should have circle collision component", function() {
        var entity = manager.listEntities()[0];
        expect(entity.hasComponent("collision")).toBeTruthy();
        var component = entity.getComponent("collision");
        expect(component.deflection).toBeCloseTo(0.6, decimalPoints);
        expect(component.friction).toBeCloseTo(0.4, decimalPoints);
        expect(component.mass).toBeCloseTo(0.5, decimalPoints);
        expect(component.shape instanceof brickdest.shape.Rectangle).toBeTruthy();
        var shape = component.shape;
        expect(shape.width).toBeCloseTo(81.3, decimalPoints);
        expect(shape.height).toBeCloseTo(35.2, decimalPoints);
      });
    });

    describe("when entity has sprite", function() {
      var image;
      beforeEach(function() {
        image = new brickdest.graphics.IImage();
        resourceCollection.register("some_image", image);
        system.applyLevel({
          "entities" : [
            {
              "sprite" : {
                "width": 32,
                "height": 64,
                "image": "some_image"
              }
            }
          ]
        });
      });

      it("entity should have sprite component", function() {
        var entity = manager.listEntities()[0];
        expect(entity.hasComponent("sprite")).toBeTruthy();
        var component = entity.getComponent("sprite");
        expect(component.width).toEqual(32);
        expect(component.height).toEqual(64);
        expect(component.image).toEqual(image);
      });
    });

    describe("when entity has mouseBound", function() {
      beforeEach(function() {
        system.applyLevel({
          "entities" : [
            {
              "mouseBound" : {
                "axisX": false,
                "axisY": true
              }
            }
          ]
        });
      });

      it("entity should have mouseBound component", function() {
        var entity = manager.listEntities()[0];
        expect(entity.hasComponent("mouseBound")).toBeTruthy();
        var component = entity.getComponent("mouseBound");
        expect(component.axisXBound).toBeFalsy();
        expect(component.axisYBound).toBeTruthy();
      });
    });

    describe("when entity references types", function() {
      beforeEach(function() {
        system.applyLevel({
          "types" : {
            "locatable" : {
              "location" : {
                "x" : 13.0,
                "y" : 23.0
              }
            },
            "movable" : {
              "motion" : {
                "speed" : {
                  "x" : 1.0,
                  "y" : -1.0
                }
              }
            }
          },
          "entities" : [
            {
              "types" : ["locatable", "movable"]
            }
          ]
        });
      });

      it("entity should have all of the components from the types", function() {
        var entity = manager.listEntities()[0];
        expect(entity.hasComponent("location")).toBeTruthy();
        expect(entity.getComponent("location").location.x).toBeCloseTo(13.0, decimalPoints);
        expect(entity.getComponent("location").location.y).toBeCloseTo(23.0, decimalPoints);
        expect(entity.hasComponent("motion")).toBeTruthy();
        expect(entity.getComponent("motion").speed.x).toBeCloseTo(1.0, decimalPoints);
        expect(entity.getComponent("motion").speed.y).toBeCloseTo(-1.0, decimalPoints);
      });
    });
  });
});
