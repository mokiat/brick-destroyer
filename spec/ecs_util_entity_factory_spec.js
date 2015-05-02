describe("EntityFactory", function() {
  var decimalPoints = 4;
  var manager;
  var resourceCollection;
  var factory;
  var entity;

  beforeEach(function() {
    manager = new brickdest.ecs.EntityManager();
    resourceCollection = new brickdest.resource.Collection();
    factory = new brickdest.ecs.EntityFactory(manager, resourceCollection);
  });

  describe("when definition is empty", function() {
    beforeEach(function() {
      entity = factory.createEntity({});
    });

    it("an empty entity should have been created", function() {
      expect(entity).toBeDefined();
      expect(entity instanceof brickdest.ecs.Entity).toBeTruthy();
    });
  });

  describe("when definition has location", function() {
    beforeEach(function() {
      entity = factory.createEntity({
        "location" : {
          "x" : 21.3,
          "y" : 36.7
        }
      });
    });

    it("an entity with location component should have been created", function() {
      expect(entity.hasComponent("location")).toBeTruthy();
      var component = entity.getComponent("location");
      expect(component.location.x).toBeCloseTo(21.3, decimalPoints);
      expect(component.location.y).toBeCloseTo(36.7, decimalPoints);
    });
  });

  describe("when definition has motion", function() {
    beforeEach(function() {
      entity = factory.createEntity({
        "motion" : {
          "speed" : {
            "x" : 1.2,
            "y" : 3.4
          }
        }
      });
    });

    it("an entity with motion component should have been created", function() {
      expect(entity.hasComponent("motion")).toBeTruthy();
      var component = entity.getComponent("motion");
      expect(component.speed.x).toBeCloseTo(1.2, decimalPoints);
      expect(component.speed.y).toBeCloseTo(3.4, decimalPoints);
    });
  });

  describe("when definition has collision with circle shape", function() {
    beforeEach(function() {
      entity = factory.createEntity({
        "collision" : {
          "deflection" : 0.6,
          "friction" : 0.4,
          "mass" : 0.5,
          "shape_circle" : {
            "radius" : 0.3
          }
        }
      });
    });

    it("an entity with collision component with circle shape should have been created", function() {
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

  describe("when definition has collision with rectangle shape", function() {
    beforeEach(function() {
      entity = factory.createEntity({
        "collision" : {
          "deflection" : 0.6,
          "friction" : 0.4,
          "mass" : 0.5,
          "shape_rectangle" : {
            "width" : 81.3,
            "height" : 35.2
          }
        }
      });
    });

    it("an entity with collision component with rectangle shape should have been created", function() {
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

  describe("when definition has sprite", function() {
    var image;

    beforeEach(function() {
      image = new brickdest.graphics.IImage();
      resourceCollection.register("some_image", image);

      entity = factory.createEntity({
        "sprite" : {
          "width": 32,
          "height": 64,
          "image": "some_image"
        }
      });
    });

    it("an entity with sprite component should have been created", function() {
      expect(entity.hasComponent("sprite")).toBeTruthy();
      var component = entity.getComponent("sprite");
      expect(component.width).toEqual(32);
      expect(component.height).toEqual(64);
      expect(component.image).toEqual(image);
    });
  });

  describe("when definition has mouseBound", function() {
    beforeEach(function() {
      entity = factory.createEntity({
        "mouseBound" : {
          "axisX": false,
          "axisY": true
        }
      });
    });

    it("an entity with mouseBound component should have been created", function() {
      expect(entity.hasComponent("mouseBound")).toBeTruthy();
      var component = entity.getComponent("mouseBound");
      expect(component.axisXBound).toBeFalsy();
      expect(component.axisYBound).toBeTruthy();
    });
  });

  describe("when definition has locationBound", function() {
    beforeEach(function() {
      entity = factory.createEntity({
        "locationBound" : {
          "minX": -1.1,
          "maxX": 2.2,
          "minY": -3.3,
          "maxY": 4.4
        }
      });
    });

    it("an entity with locationBound component should have been created", function() {
      expect(entity.hasComponent("locationBound")).toBeTruthy();
      var component = entity.getComponent("locationBound");
      expect(component.minX).toBeCloseTo(-1.1, decimalPoints);
      expect(component.maxX).toBeCloseTo(2.2, decimalPoints);
      expect(component.minY).toBeCloseTo(-3.3, decimalPoints);
      expect(component.maxY).toBeCloseTo(4.4, decimalPoints);
    });
  });

  describe("when definition has destroyOnHit", function() {
    beforeEach(function() {
      entity = factory.createEntity({
        "destroyOnHit" : {}
      });
    });

    it("an entity with destroyOnHit component should have been created", function() {
      expect(entity.hasComponent("destroyOnHit")).toBeTruthy();
    });
  });

  describe("when definition has spawnOnDestroy", function() {
    beforeEach(function() {
      entity = factory.createEntity({
        "spawnOnDestroy" : {
          "definition" : {
            "location" : {
              "x" : 6.5,
              "y" : 3.4
            }
          }
        }
      });
    });

    it("an entity with spawnOnDestory component should have been created", function() {
      expect(entity.hasComponent("spawnOnDestroy")).toBeTruthy();
      var component = entity.getComponent("spawnOnDestroy");
      expect(component.definition).toEqual({
        "location" : {
          "x" : 6.5,
          "y" : 3.4
        }
      });
    });
  });

  describe("when definition has bounceTogglable", function() {
    var sliderOnImage;
    var sliderOffImage;

    beforeEach(function() {
      sliderOnImage = new brickdest.graphics.IImage();
      resourceCollection.register("slider_on", sliderOnImage);

      sliderOffImage = new brickdest.graphics.IImage();
      resourceCollection.register("slider_off", sliderOffImage);

      entity = factory.createEntity({
        "bounceTogglable" : {
          "activeImage" : "slider_on",
          "inactiveImage" : "slider_off",
          "deflection" : {
            "x" : 0.3,
            "y" : 0.4
          }
        }
      });
    });

    it("an entity with bounceTogglable component should have been created", function() {
      expect(entity.hasComponent("bounceTogglable")).toBeTruthy();
      var component = entity.getComponent("bounceTogglable");
      expect(component.activeImage).toBe(sliderOnImage);
      expect(component.inactiveImage).toBe(sliderOffImage);
      expect(component.deflection.x).toBeCloseTo(0.3, decimalPoints);
      expect(component.deflection.y).toBeCloseTo(0.4, decimalPoints);
    });
  });

  describe("when definition has shouldDestroy", function() {
    beforeEach(function() {
      entity = factory.createEntity({
        "shouldDestroy" : {}
      });
    });

    it("an entity with shouldDestroy component should have been created", function() {
      expect(entity.hasComponent("shouldDestroy")).toBeTruthy();
    });
  });

  describe("when definition has shouldNotDestroy", function() {
    beforeEach(function() {
      entity = factory.createEntity({
        "shouldNotDestroy" : {}
      });
    });

    it("an entity with shouldNotDestroy component should have been created", function() {
      expect(entity.hasComponent("shouldNotDestroy")).toBeTruthy();
    });
  });
});
