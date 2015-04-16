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
});
