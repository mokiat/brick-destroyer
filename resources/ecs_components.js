oop.namespace("brickdest.ecs");

brickdest.ecs.LocationComponent = oop.class({
  location: null,
  __create__: function() {
    this.location = new brickdest.math.Vector();
  }
});

brickdest.ecs.MotionComponent = oop.class({
  speed: null,
  mass: 1.0,
  __create__: function() {
    this.speed = new brickdest.math.Vector();
  }
});

brickdest.ecs.SpriteComponent = oop.class({
  image: null,
  width: 0,
  height: 0
});
