class MouseBound {
  constructor(manager) {
    this.manager = manager;
    this.mouseX = null;
    this.mouseY = null;
  }

  update(elapsedSeconds) {
    if (this.mouseX === null || this.mouseY === null) {
      return;
    }
    const entities = this.manager.filterEntities(['location', 'mouseBound']);
    for (const entity of entities) {
      this.placeEntityAt(entity, this.mouseX, this.mouseY);
    }
  }

  onMouseMove(x, y) {
    this.mouseX = x;
    this.mouseY = y;
  }

  placeEntityAt(entity, x, y) {
    const locationComp = entity.getComponent('location');
    const mouseBoundComp = entity.getComponent('mouseBound');
    if (mouseBoundComp.axisXBound) {
      locationComp.location.x = x;
    }
    if (mouseBoundComp.axisYBound) {
      locationComp.location.y = y;
    }
  }
}

export default MouseBound;
