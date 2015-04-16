describe("Entity-Component-System Components", function() {
  var decimalPoints = 4;
  var component;

  describe("LocationComponent", function() {
    beforeEach(function() {
      component = new brickdest.ecs.LocationComponent();
    });

    it("has default location of 0.0/0.0", function() {
      expect(component.location.x).toBeCloseTo(0.0, decimalPoints);
      expect(component.location.y).toBeCloseTo(0.0, decimalPoints);
    });
  });

  describe("MotionComponent", function() {
    beforeEach(function() {
      component = new brickdest.ecs.MotionComponent();
    });

    it("has default speed of 0.0/0.0", function() {
      expect(component.speed.x).toBeCloseTo(0.0, decimalPoints);
      expect(component.speed.y).toBeCloseTo(0.0, decimalPoints);
    });

    it("has default mass of 1.0", function() {
      expect(component.mass).toBeCloseTo(1.0, decimalPoints);
    });
  });

  describe("CollisionComponent", function() {
    beforeEach(function() {
      component = new brickdest.ecs.CollisionComponent();
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

  describe("SpriteComponent", function() {
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
});
