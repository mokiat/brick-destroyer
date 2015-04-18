oop.namespace("brickdest.ecs");

brickdest.ecs.CollisionEvaluator = oop.class({
  getEscapeVector: function(staticEntity, candidateEntity) {
    if (this.areTooFar(staticEntity, candidateEntity)) {
      return null;
    }
    if (this.isCircle(staticEntity) && this.isCircle(candidateEntity)) {
      return this.getEscapeVectorCircleCircle(staticEntity, candidateEntity);
    }
    if (this.isRectangle(staticEntity) && this.isRectangle(candidateEntity)) {
      return this.getEscapeVectorRectangleRectangle(staticEntity, candidateEntity);
    }
    return null;
  },
  areTooFar: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var distance = candidateLocationComp.location.dec(staticLocationComp.location);
    var minCollisionDistance =
          staticCollisionComp.shape.getFurthestPointDistance() +
          candidateCollisionComp.shape.getFurthestPointDistance();
    return (distance.getLength() > minCollisionDistance);
  },
  getEscapeVectorCircleCircle: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var distance = candidateLocationComp.location.dec(staticLocationComp.location);
    var penetration =
          staticCollisionComp.shape.radius +
          candidateCollisionComp.shape.radius -
          distance.getLength();
    if (penetration < 0.0) {
      return null;
    }
    return distance.resize(penetration);
  },
  getEscapeVectorRectangleRectangle: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var staticLeft = staticLocationComp.location.x - staticCollisionComp.shape.getHalfWidth();
    var staticRight = staticLocationComp.location.x + staticCollisionComp.shape.getHalfWidth();
    var staticTop = staticLocationComp.location.y - staticCollisionComp.shape.getHalfHeight();
    var staticBottom = staticLocationComp.location.y + staticCollisionComp.shape.getHalfHeight();
    var candidateLeft = candidateLocationComp.location.x - candidateCollisionComp.shape.getHalfWidth();
    var candidateRight = candidateLocationComp.location.x + candidateCollisionComp.shape.getHalfWidth();
    var candidateTop = candidateLocationComp.location.y - candidateCollisionComp.shape.getHalfHeight();
    var candidateBottom = candidateLocationComp.location.y + candidateCollisionComp.shape.getHalfHeight();
    var escapeVector = new brickdest.math.Vector();
    var minEscape = 10000.0;
    if ((staticRight < candidateLeft) || (staticLeft > candidateRight)) {
      return null;
    }
    if ((staticBottom < candidateTop) || (staticTop > candidateBottom)) {
      return null;
    }
    if (candidateLeft < staticRight) {
      var escape = staticRight - candidateLeft;
      if (escape < minEscape) {
        minEscape = escape;
        escapeVector.x = escape;
        escapeVector.y = 0.0;
      }
    }
    if (candidateBottom > staticTop) {
      var escape = candidateBottom - staticTop;
      if (escape < minEscape) {
        minEscape = escape;
        escapeVector.x = 0.0;
        escapeVector.y = -escape;
      }
    }
    if (candidateRight > staticLeft) {
      var escape = candidateRight - staticLeft;
      if (escape < minEscape) {
        minEscape = escape;
        escapeVector.x = -escape;
        escapeVector.y = 0.0;
      }
    }
    if (candidateTop < staticBottom) {
      var escape = staticBottom - candidateTop;
      if (escape < minEscape) {
        minEscape = escape;
        escapeVector.x = 0.0;
        escapeVector.y = escape;
      }
    }
    return escapeVector;
  },
  isCircle: function(entity) {
    var collisionComp = entity.getComponent("collision");
    return (collisionComp.shape instanceof brickdest.shape.Circle);
  },
  isRectangle: function(entity) {
    var collisionComp = entity.getComponent("collision");
    return (collisionComp.shape instanceof brickdest.shape.Rectangle);
  }
});
