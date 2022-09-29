import Rectangle from '../../shape/Rectangle';
import Circle from '../../shape/Circle';
import Vector from '../../math/Vector';

class Evaluator {
  getEscapeVector(staticEntity, candidateEntity) {
    if (this.areTooFar(staticEntity, candidateEntity)) {
      return null;
    }
    if (this.isCircle(staticEntity) && this.isCircle(candidateEntity)) {
      return this.getEscapeVectorCircleCircle(staticEntity, candidateEntity);
    }
    if (this.isRectangle(staticEntity) && this.isRectangle(candidateEntity)) {
      return this.getEscapeVectorRectangleRectangle(
        staticEntity,
        candidateEntity
      );
    }
    if (this.isRectangle(staticEntity) && this.isCircle(candidateEntity)) {
      return this.getEscapeVectorRectangleCircle(staticEntity, candidateEntity);
    }
    if (this.isCircle(staticEntity) && this.isRectangle(candidateEntity)) {
      return this.getEscapeVectorRectangleCircle(
        candidateEntity,
        staticEntity
      ).mul(-1.0);
    }
    return null;
  }

  areTooFar(staticEntity, candidateEntity) {
    const staticLocationComp = staticEntity.getComponent('location');
    const staticCollisionComp = staticEntity.getComponent('collision');
    const candidateLocationComp = candidateEntity.getComponent('location');
    const candidateCollisionComp = candidateEntity.getComponent('collision');
    const distance = candidateLocationComp.location.dec(
      staticLocationComp.location
    );
    const minCollisionDistance =
      staticCollisionComp.shape.furthestPointDistance +
      candidateCollisionComp.shape.furthestPointDistance;
    return distance.length > minCollisionDistance;
  }

  getEscapeVectorCircleCircle(staticEntity, candidateEntity) {
    const staticLocationComp = staticEntity.getComponent('location');
    const staticCollisionComp = staticEntity.getComponent('collision');
    const candidateLocationComp = candidateEntity.getComponent('location');
    const candidateCollisionComp = candidateEntity.getComponent('collision');
    const distance = candidateLocationComp.location.dec(
      staticLocationComp.location
    );
    const penetration =
      staticCollisionComp.shape.radius +
      candidateCollisionComp.shape.radius -
      distance.length;
    if (penetration < 0.0) {
      return null;
    }
    return distance.resize(penetration);
  }

  getEscapeVectorRectangleRectangle(staticEntity, candidateEntity) {
    const staticLocationComp = staticEntity.getComponent('location');
    const staticCollisionComp = staticEntity.getComponent('collision');
    const candidateLocationComp = candidateEntity.getComponent('location');
    const candidateCollisionComp = candidateEntity.getComponent('collision');
    const staticLeft =
      staticLocationComp.location.x - staticCollisionComp.shape.halfWidth;
    const staticRight =
      staticLocationComp.location.x + staticCollisionComp.shape.halfWidth;
    const staticTop =
      staticLocationComp.location.y - staticCollisionComp.shape.halfHeight;
    const staticBottom =
      staticLocationComp.location.y + staticCollisionComp.shape.halfHeight;
    const candidateLeft =
      candidateLocationComp.location.x - candidateCollisionComp.shape.halfWidth;
    const candidateRight =
      candidateLocationComp.location.x + candidateCollisionComp.shape.halfWidth;
    const candidateTop =
      candidateLocationComp.location.y -
      candidateCollisionComp.shape.halfHeight;
    const candidateBottom =
      candidateLocationComp.location.y +
      candidateCollisionComp.shape.halfHeight;

    let horizontalEscape;
    const horizontalOverlap =
      candidateLeft < staticRight && candidateRight > staticLeft;
    if (horizontalOverlap) {
      if (candidateLocationComp.location.x > staticLocationComp.location.x) {
        horizontalEscape = new Vector(staticRight - candidateLeft, 0.0);
      } else {
        horizontalEscape = new Vector(staticLeft - candidateRight, 0.0);
      }
    } else {
      return null;
    }

    let verticalEscape;
    const verticalOverlap =
      candidateTop < staticBottom && candidateBottom > staticTop;
    if (verticalOverlap) {
      if (candidateLocationComp.location.y > staticLocationComp.location.y) {
        verticalEscape = new Vector(0.0, staticBottom - candidateTop);
      } else {
        verticalEscape = new Vector(0.0, staticTop - candidateBottom);
      }
    } else {
      return null;
    }

    if (verticalEscape.squaredLength < horizontalEscape.squaredLength) {
      return verticalEscape;
    } else {
      return horizontalEscape;
    }
  }

  getEscapeVectorRectangleCircle(staticEntity, candidateEntity) {
    const staticLocationComp = staticEntity.getComponent('location');
    const staticCollisionComp = staticEntity.getComponent('collision');
    const candidateLocationComp = candidateEntity.getComponent('location');
    const candidateCollisionComp = candidateEntity.getComponent('collision');
    const staticLeft =
      staticLocationComp.location.x - staticCollisionComp.shape.halfWidth;
    const staticRight =
      staticLocationComp.location.x + staticCollisionComp.shape.halfWidth;
    const staticTop =
      staticLocationComp.location.y - staticCollisionComp.shape.halfHeight;
    const staticBottom =
      staticLocationComp.location.y + staticCollisionComp.shape.halfHeight;
    const candidateLeft =
      candidateLocationComp.location.x - candidateCollisionComp.shape.radius;
    const candidateRight =
      candidateLocationComp.location.x + candidateCollisionComp.shape.radius;
    const candidateTop =
      candidateLocationComp.location.y - candidateCollisionComp.shape.radius;
    const candidateBottom =
      candidateLocationComp.location.y + candidateCollisionComp.shape.radius;

    let horizontalEscape;
    const horizontalOverlap =
      candidateLeft < staticRight && candidateRight > staticLeft;
    if (horizontalOverlap) {
      if (candidateLocationComp.location.x > staticLocationComp.location.x) {
        horizontalEscape = new Vector(staticRight - candidateLeft, 0.0);
      } else {
        horizontalEscape = new Vector(staticLeft - candidateRight, 0.0);
      }
    } else {
      return null;
    }

    let verticalEscape;
    const verticalOverlap =
      candidateTop < staticBottom && candidateBottom > staticTop;
    if (verticalOverlap) {
      if (candidateLocationComp.location.y > staticLocationComp.location.y) {
        verticalEscape = new Vector(0.0, staticBottom - candidateTop);
      } else {
        verticalEscape = new Vector(0.0, staticTop - candidateBottom);
      }
    } else {
      return null;
    }

    const cornerOverlapPossible =
      (candidateLocationComp.location.x < staticLeft ||
        candidateLocationComp.location.x > staticRight) &&
      (candidateLocationComp.location.y < staticTop ||
        candidateLocationComp.location.y > staticBottom);
    if (cornerOverlapPossible) {
      const cornerDistance = new Vector();
      if (candidateLocationComp.location.x < staticLeft) {
        cornerDistance.x = candidateLocationComp.location.x - staticLeft;
      } else {
        cornerDistance.x = candidateLocationComp.location.x - staticRight;
      }
      if (candidateLocationComp.location.y < staticTop) {
        cornerDistance.y = candidateLocationComp.location.y - staticTop;
      } else {
        cornerDistance.y = candidateLocationComp.location.y - staticBottom;
      }
      const distanceLength = cornerDistance.length;
      if (distanceLength > candidateCollisionComp.shape.radius) {
        return null;
      }
      return cornerDistance.resize(
        candidateCollisionComp.shape.radius - distanceLength
      );
    }

    if (verticalEscape.squaredLength < horizontalEscape.squaredLength) {
      return verticalEscape;
    } else {
      return horizontalEscape;
    }
  }

  isCircle(entity) {
    const collisionComp = entity.getComponent('collision');
    return collisionComp.shape instanceof Circle;
  }

  isRectangle(entity) {
    const collisionComp = entity.getComponent('collision');
    return collisionComp.shape instanceof Rectangle;
  }
}

export default Evaluator;
