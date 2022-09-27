(function(ns, undefined) {

	ns.CollisionEvaluator = function() {
	};

	ns.CollisionEvaluator.prototype.getEscapeVector = function(staticEntity, candidateEntity) {
		if (this.areTooFar(staticEntity, candidateEntity)) {
      return null;
    }
    if (this.isCircle(staticEntity) && this.isCircle(candidateEntity)) {
      return this.getEscapeVectorCircleCircle(staticEntity, candidateEntity);
    }
    if (this.isRectangle(staticEntity) && this.isRectangle(candidateEntity)) {
      return this.getEscapeVectorRectangleRectangle(staticEntity, candidateEntity);
    }
    if (this.isRectangle(staticEntity) && this.isCircle(candidateEntity)) {
      return this.getEscapeVectorRectangleCircle(staticEntity, candidateEntity);
    }
    if (this.isCircle(staticEntity) && this.isRectangle(candidateEntity)) {
      return this.getEscapeVectorRectangleCircle(candidateEntity, staticEntity).mul(-1.0);
    }
    return null;
	};

	ns.CollisionEvaluator.prototype.areTooFar = function(staticEntity, candidateEntity) {
		var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var distance = candidateLocationComp.location.dec(staticLocationComp.location);
    var minCollisionDistance =
          staticCollisionComp.shape.getFurthestPointDistance() +
          candidateCollisionComp.shape.getFurthestPointDistance();
    return (distance.getLength() > minCollisionDistance);
	};

	ns.CollisionEvaluator.prototype.getEscapeVectorCircleCircle = function(staticEntity, candidateEntity) {
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
	};

	ns.CollisionEvaluator.prototype.getEscapeVectorRectangleRectangle = function(staticEntity, candidateEntity) {
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

    var horizontalEscape;
    var horizontalOverlap = (candidateLeft < staticRight) && (candidateRight > staticLeft);
    if (horizontalOverlap) {
      if (candidateLocationComp.location.x > staticLocationComp.location.x) {
        horizontalEscape = new math.Vector(staticRight - candidateLeft, 0.0);
      } else {
        horizontalEscape = new math.Vector(staticLeft - candidateRight, 0.0);
      }
    } else {
      return null;
    }

    var verticalEscape;
    var verticalOverlap = (candidateTop < staticBottom) && (candidateBottom > staticTop);
    if (verticalOverlap) {
      if (candidateLocationComp.location.y > staticLocationComp.location.y) {
        verticalEscape = new math.Vector(0.0, staticBottom - candidateTop);
      } else {
        verticalEscape = new math.Vector(0.0, staticTop - candidateBottom);
      }
    } else {
      return null;
    }

    if (verticalEscape.getSquaredLength() < horizontalEscape.getSquaredLength()) {
      return verticalEscape;
    } else {
      return horizontalEscape;
    }
	};

	ns.CollisionEvaluator.prototype.getEscapeVectorRectangleCircle = function(staticEntity, candidateEntity) {
		var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var staticLeft = staticLocationComp.location.x - staticCollisionComp.shape.getHalfWidth();
    var staticRight = staticLocationComp.location.x + staticCollisionComp.shape.getHalfWidth();
    var staticTop = staticLocationComp.location.y - staticCollisionComp.shape.getHalfHeight();
    var staticBottom = staticLocationComp.location.y + staticCollisionComp.shape.getHalfHeight();
    var candidateLeft = candidateLocationComp.location.x - candidateCollisionComp.shape.radius;
    var candidateRight = candidateLocationComp.location.x + candidateCollisionComp.shape.radius;
    var candidateTop = candidateLocationComp.location.y - candidateCollisionComp.shape.radius;
    var candidateBottom = candidateLocationComp.location.y + candidateCollisionComp.shape.radius;

    var horizontalEscape;
    var horizontalOverlap = (candidateLeft < staticRight) && (candidateRight > staticLeft);
    if (horizontalOverlap) {
      if (candidateLocationComp.location.x > staticLocationComp.location.x) {
        horizontalEscape = new math.Vector(staticRight - candidateLeft, 0.0);
      } else {
        horizontalEscape = new math.Vector(staticLeft - candidateRight, 0.0);
      }
    } else {
      return null;
    }

    var verticalEscape;
    var verticalOverlap = (candidateTop < staticBottom) && (candidateBottom > staticTop);
    if (verticalOverlap) {
      if (candidateLocationComp.location.y > staticLocationComp.location.y) {
        verticalEscape = new math.Vector(0.0, staticBottom - candidateTop);
      } else {
        verticalEscape = new math.Vector(0.0, staticTop - candidateBottom);
      }
    } else {
      return null;
    }

    var cornerOverlapPossible =
          ((candidateLocationComp.location.x < staticLeft) || (candidateLocationComp.location.x > staticRight)) &&
          ((candidateLocationComp.location.y < staticTop) || (candidateLocationComp.location.y > staticBottom));
    if (cornerOverlapPossible) {
      var cornerDistance = new math.Vector();
      if (candidateLocationComp.location.x < staticLeft) {
        cornerDistance.x = (candidateLocationComp.location.x - staticLeft);
      } else {
        cornerDistance.x = (candidateLocationComp.location.x - staticRight);
      }
      if (candidateLocationComp.location.y < staticTop) {
        cornerDistance.y = (candidateLocationComp.location.y - staticTop);
      } else {
        cornerDistance.y = (candidateLocationComp.location.y - staticBottom);
      }
      var distanceLength = cornerDistance.getLength();
      if (distanceLength > candidateCollisionComp.shape.radius) {
        return null;
      }
      return cornerDistance.resize(candidateCollisionComp.shape.radius - distanceLength);
    }

    if (verticalEscape.getSquaredLength() < horizontalEscape.getSquaredLength()) {
      return verticalEscape;
    } else {
      return horizontalEscape;
    }
	};

	ns.CollisionEvaluator.prototype.isCircle = function(entity) {
		var collisionComp = entity.getComponent("collision");
    return (collisionComp.shape instanceof shapes.Circle);
	};

	ns.CollisionEvaluator.prototype.isRectangle = function(entity) {
		var collisionComp = entity.getComponent("collision");
    return (collisionComp.shape instanceof shapes.Rectangle);
	};


})(window.game = window.game || {});
