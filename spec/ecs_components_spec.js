describe("Entity-Component-System Components", function() {
  var decimalPoints = 4;
  var component;

  describe("LocationComponent", function() {
    describe("when a default one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.LocationComponent();
      });

      it("has default location of 0.0/0.0", function() {
        expect(component.location.x).toBeCloseTo(0.0, decimalPoints);
        expect(component.location.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("when a config-based one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.LocationComponent({
          location: new brickdest.math.Vector(1.2, 3.4)
        });
      });

      it("has location set accordingly", function() {
        expect(component.location.x).toBeCloseTo(1.2, decimalPoints);
        expect(component.location.y).toBeCloseTo(3.4, decimalPoints);
      });
    });
  });

  describe("MotionComponent", function() {
    describe("when a default one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.MotionComponent();
      });

      it("has default speed of 0.0/0.0", function() {
        expect(component.speed.x).toBeCloseTo(0.0, decimalPoints);
        expect(component.speed.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("when a config-based one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.MotionComponent({
          speed: new brickdest.math.Vector(2.3, 4.5)
        });
      });

      it("has speed set accordingly", function() {
        expect(component.speed.x).toBeCloseTo(2.3, decimalPoints);
        expect(component.speed.y).toBeCloseTo(4.5, decimalPoints);
      });
    });
  });

  describe("CollisionComponent", function() {
    describe("when a default one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.CollisionComponent();
      });

      it("has default mass of 1.0", function() {
        expect(component.mass).toBeCloseTo(1.0, decimalPoints);
      });

      it("has default friction of 0.2", function() {
        expect(component.friction).toBeCloseTo(0.2, decimalPoints);
      });

      it("has default deflection of 0.8", function() {
        expect(component.deflection).toBeCloseTo(0.8, decimalPoints);
      });

      it("has no shape by default", function() {
        expect(component.shape).toBeNull();
      });
    });

    describe("when a config-based one is created", function() {
      var shape;

      beforeEach(function() {
        shape = new brickdest.shape.Circle({
          radius: 5.4
        });
        component = new brickdest.ecs.CollisionComponent({
          mass: 8.9,
          friction: 0.0,
          deflection: 0.1,
          shape: shape
        });
      });

      it("has mass set accordingly", function() {
        expect(component.mass).toBeCloseTo(8.9, decimalPoints);
      });

      it("has friction set accordingly", function() {
        expect(component.friction).toBeCloseTo(0.0, decimalPoints);
      });

      it("has deflection set accordingly", function() {
        expect(component.deflection).toBeCloseTo(0.1, decimalPoints);
      });

      it("has shape set accordingly", function() {
        expect(component.shape).toEqual(shape);
      });
    });
  });

  describe("SpriteComponent", function() {
    describe("when a default one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.SpriteComponent();
      });

      it("has default sprite width of 0", function() {
        expect(component.width).toEqual(0);
      });

      it("has default sprite height of 0", function() {
        expect(component.height).toEqual(0);
      });

      it("has no image by default", function() {
        expect(component.image).toBeNull();
      });
    });

    describe("when a config-based one is created", function() {
      var image;

      beforeEach(function() {
        image = new brickdest.graphics.IImage();
        component = new brickdest.ecs.SpriteComponent({
          width: 32,
          height: 64,
          image: image
        });
      });

      it("has sprite width set accordingly", function() {
        expect(component.width).toEqual(32);
      });

      it("has sprite height set accordingly", function() {
        expect(component.height).toEqual(64);
      });

      it("has image set accordingly", function() {
        expect(component.image).toEqual(image);
      });
    });
  });

  describe("MouseBoundComponent", function() {
    describe("when a default one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.MouseBoundComponent();
      });

      it("has axis X bound by default", function() {
        expect(component.axisXBound).toBeTruthy();
      });

      it("has axis Y bound by default", function() {
        expect(component.axisYBound).toBeTruthy();
      });
    });

    describe("when a config-based one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.MouseBoundComponent({
          axisXBound: false,
          axisYBound: false
        });
      });

      it("has axis X bound set accordingly", function() {
        expect(component.axisXBound).toBeFalsy();
      });

      it("has axis Y bound set accordingly", function() {
        expect(component.axisYBound).toBeFalsy();
      });
    });
  });

  describe("LocationBoundComponent", function() {
    describe("when a default one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.LocationBoundComponent();
      });

      it("has a very negative min X", function() {
        expect(component.minX).toBeCloseTo(-5000.0, decimalPoints);
      });

      it("has a very positive max X", function() {
        expect(component.maxX).toBeCloseTo(5000.0, decimalPoints);
      });

      it("has a very negative min Y", function() {
        expect(component.minY).toBeCloseTo(-5000.0, decimalPoints);
      });

      it("has a very positive max Y", function() {
        expect(component.maxY).toBeCloseTo(5000.0, decimalPoints);
      });
    });

    describe("when a config-based one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.LocationBoundComponent({
          minX: -13.2,
          maxX: 15.8,
          minY: -8.5,
          maxY: 3.9
        });
      });

      it("has min X set accordingly", function() {
        expect(component.minX).toBeCloseTo(-13.2);
      });

      it("has max X set accordingly", function() {
        expect(component.maxX).toBeCloseTo(15.8);
      });

      it("has min Y set accordingly", function() {
        expect(component.minY).toBeCloseTo(-8.5);
      });

      it("has max Y set accordingly", function() {
        expect(component.maxY).toBeCloseTo(3.9);
      });
    });
  });

  describe("SpawnOnDestroyComponent", function() {
    describe("when a default one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.SpawnOnDestroyComponent();
      });

      it("has an empty definition", function() {
        expect(component.definition).toEqual({});
      });
    });

    describe("when a config-based one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.SpawnOnDestroyComponent({
          "definition" : {
            "some_component" : {
              "some_key" : "some_value"
            }
          }
        });
      });

      it("has a definition accordingly", function() {
        expect(component.definition).toEqual({
          "some_component" : {
            "some_key" : "some_value"
          }
        });
      });
    });
  });

  describe("BounceTogglableComponent", function() {
    describe("when a default one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.BounceTogglableComponent();
      });

      it("has no active image", function() {
        expect(component.activeImage).toBeNull();
      });

      it("has no inactive image", function() {
        expect(component.inactiveImage).toBeNull();
      });

      it("has horizontal deflection set to 0.1 by default", function() {
        expect(component.deflection.x).toBeCloseTo(0.1, decimalPoints);
      });

      it("has vertical deflection set to 0.1 by default", function() {
        expect(component.deflection.y).toBeCloseTo(0.1, decimalPoints);
      });
    });

    describe("when a config-based one is created", function() {
      var activeImage;
      var inactiveImage;

      beforeEach(function() {
        activeImage = new brickdest.graphics.IImage();
        inactiveImage = new brickdest.graphics.IImage();

        component = new brickdest.ecs.BounceTogglableComponent({
          activeImage : activeImage,
          inactiveImage : inactiveImage,
          deflection: new brickdest.math.Vector(7.6, 5.3)
        });
      });

      it("has active image set accordingly", function() {
        expect(component.activeImage).toBe(activeImage);
      });

      it("has inactive image set accordingly", function() {
        expect(component.inactiveImage).toBe(inactiveImage);
      });

      it("has horizontal deflection set accordingly", function() {
        expect(component.deflection.x).toBeCloseTo(7.6, decimalPoints);
      });

      it("has vertical deflection set accordingly", function() {
        expect(component.deflection.y).toBeCloseTo(5.3, decimalPoints);
      });
    });
  });

  describe("TimerDestroyComponent", function() {
    describe("when a default one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.TimerDestroyComponent();
      });

      it("has a default timeout of 10 seconds", function() {
        expect(component.timeout).toBeCloseTo(10.0, decimalPoints);
      });
    });

    describe("when a config-based one is created", function() {
      beforeEach(function() {
        component = new brickdest.ecs.TimerDestroyComponent({
          timeout: 1.5
        });
      });

      it("has timeout set accordingly", function() {
        expect(component.timeout).toBeCloseTo(1.5, decimalPoints);
      });
    });
  });
});
