oop.namespace("brickdest.ecs");

brickdest.ecs.LocationComponent = oop.class({
  location: null,
  __create__: function() {
    this.location = new brickdest.math.Vector();
  },
});
