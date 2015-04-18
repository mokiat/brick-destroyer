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
          friction: 0.5,
          deflection: 0.1,
          shape: shape
        });
      });

      it("has mass set accordingly", function() {
        expect(component.mass).toBeCloseTo(8.9, decimalPoints);
      });

      it("has friction set accordingly", function() {
        expect(component.friction).toBeCloseTo(0.5, decimalPoints);
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
});
