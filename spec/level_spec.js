describe("JSONLevel", function() {
  var level;

  beforeEach(function() {
    level = new brickdest.level.JSONLevel("spec/example_level.json");
  });

  describe("when loaded", function() {
    beforeEach(function() {
      waitsFor(function() {
        return level.isLoaded();
      }, "The level should be loaded.", 2000);
    });

    it("should have the proper brick types", function() {
      expect(level.getBrickType(0, 0)).toEqual(brickdest.level.BRICK_GREY);
      expect(level.getBrickType(0, 1)).toEqual(brickdest.level.BRICK_NONE);
      expect(level.getBrickType(0, 2)).toEqual(brickdest.level.BRICK_GREY);
      expect(level.getBrickType(0, 3)).toEqual(brickdest.level.BRICK_NONE);
      expect(level.getBrickType(0, 4)).toEqual(brickdest.level.BRICK_NONE);
      expect(level.getBrickType(0, 5)).toEqual(brickdest.level.BRICK_GREY);
      expect(level.getBrickType(0, 6)).toEqual(brickdest.level.BRICK_NONE);
      expect(level.getBrickType(0, 7)).toEqual(brickdest.level.BRICK_GREY);

      expect(level.getBrickType(1, 0)).toEqual(brickdest.level.BRICK_RED);
      expect(level.getBrickType(1, 1)).toEqual(brickdest.level.BRICK_GREY);
      expect(level.getBrickType(1, 2)).toEqual(brickdest.level.BRICK_GREEN);
      expect(level.getBrickType(1, 3)).toEqual(brickdest.level.BRICK_STAR);
      expect(level.getBrickType(1, 4)).toEqual(brickdest.level.BRICK_STAR);
      expect(level.getBrickType(1, 5)).toEqual(brickdest.level.BRICK_GREEN);
      expect(level.getBrickType(1, 6)).toEqual(brickdest.level.BRICK_GREY);
      expect(level.getBrickType(1, 7)).toEqual(brickdest.level.BRICK_RED);

      expect(level.getBrickType(2, 0)).toEqual(brickdest.level.BRICK_BOUNCE);
      expect(level.getBrickType(2, 1)).toEqual(brickdest.level.BRICK_FRICTION);
      expect(level.getBrickType(2, 2)).toEqual(brickdest.level.BRICK_BALL);
      expect(level.getBrickType(2, 3)).toEqual(brickdest.level.BRICK_RED);
      expect(level.getBrickType(2, 4)).toEqual(brickdest.level.BRICK_RED);
      expect(level.getBrickType(2, 5)).toEqual(brickdest.level.BRICK_BALL);
      expect(level.getBrickType(2, 6)).toEqual(brickdest.level.BRICK_GRAVITY);
      expect(level.getBrickType(2, 7)).toEqual(brickdest.level.BRICK_FRICTION);

      expect(level.getBrickType(3, 0)).toEqual(brickdest.level.BRICK_GREEN);
      expect(level.getBrickType(3, 1)).toEqual(brickdest.level.BRICK_RED);
      expect(level.getBrickType(3, 2)).toEqual(brickdest.level.BRICK_BOUNCE);
      expect(level.getBrickType(3, 3)).toEqual(brickdest.level.BRICK_GREEN);
      expect(level.getBrickType(3, 4)).toEqual(brickdest.level.BRICK_GREEN);
      expect(level.getBrickType(3, 5)).toEqual(brickdest.level.BRICK_FRICTION);
      expect(level.getBrickType(3, 6)).toEqual(brickdest.level.BRICK_RED);
      expect(level.getBrickType(3, 7)).toEqual(brickdest.level.BRICK_GREEN);
    });
  });
});
