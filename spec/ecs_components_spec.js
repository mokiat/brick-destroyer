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
