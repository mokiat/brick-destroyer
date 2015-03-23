oop.namespace("brickdest.level");

brickdest.level.ROWS = 4;
brickdest.level.COLUMNS = 8;

brickdest.level.BRICK_NONE = "none";
brickdest.level.BRICK_GREEN = "green";
brickdest.level.BRICK_RED = "red";
brickdest.level.BRICK_GREY = "grey";
brickdest.level.BRICK_STAR = "star";
brickdest.level.BRICK_BALL = "ball";
brickdest.level.BRICK_GRAVITY = "gravity";
brickdest.level.BRICK_FRICTION = "friction";
brickdest.level.BRICK_BOUNCE = "bounce";

brickdest.level.JSONLevel = oop.class(brickdest.resource.Resource, {
  __create__: function(path) {
    this.__super__();
    $.get(path, $.proxy(this.onLevelLoaded, this), "json");
  },
  onLevelLoaded: function(data) {
    this.brickTypes = data;
    this.setLoaded(true);
  },
  getBrickType: function(row, column) {
    return this.brickTypes[row][column];
  }
});
