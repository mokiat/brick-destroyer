class LocationBound {
  constructor(manager) {
    this.manager = manager;
  }

  update(elapsedSeconds) {
    const entities = this.manager.filterEntities(['location', 'locationBound']);
    for (let entity of entities) {
      this.checkEntityLocation(entity);
    }
  }

  checkEntityLocation(entity) {
    const locationComp = entity.getComponent('location');
    const locationBoundComp = entity.getComponent('locationBound');
    if (locationComp.location.x < locationBoundComp.minX) {
      locationComp.location.x = locationBoundComp.minX;
    }
    if (locationComp.location.x > locationBoundComp.maxX) {
      locationComp.location.x = locationBoundComp.maxX;
    }
    if (locationComp.location.y < locationBoundComp.minY) {
      locationComp.location.y = locationBoundComp.minY;
    }
    if (locationComp.location.y > locationBoundComp.maxY) {
      locationComp.location.y = locationBoundComp.maxY;
    }
  }
}

export default LocationBound;
