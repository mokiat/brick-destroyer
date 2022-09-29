import LocationBoundSystem from './LocationBound';
import EntityManager from '../../ecs/Manager';
import Location from '../component/Location';
import LocationBound from '../component/LocationBound';

describe('LocationBoundSystem', () => {
  let manager;
  let system;
  let entity;

  beforeEach(() => {
    manager = new EntityManager();
    system = new LocationBoundSystem(manager);
    manager.addSystem(system);

    entity = manager.createEntity();
    entity.addComponent('location', new Location());
    entity.addComponent(
      'locationBound',
      new LocationBound({
        minX: -1.0,
        maxX: 2.0,
        minY: -3.0,
        maxY: 4.0,
      })
    );
  });

  const placeEntityAt = (entity, x, y) => {
    const locationComp = entity.getComponent('location');
    locationComp.location.x = x;
    locationComp.location.y = y;
  };

  const assertEntityLocation = (entity, expectedX, expectedY) => {
    const locationComp = entity.getComponent('location');
    expect(locationComp.location.x).toBeCloseTo(expectedX);
    expect(locationComp.location.y).toBeCloseTo(expectedY);
  };

  describe('when entity is inside bounds', () => {
    beforeEach(() => {
      manager.update(1.0);
    });

    test('entity should not have changed its location', () => {
      assertEntityLocation(entity, 0.0, 0.0);
    });
  });

  describe('when entity is outside min X', () => {
    beforeEach(() => {
      placeEntityAt(entity, -1.1, 0.0);
      manager.update(1.0);
    });

    test('entity should have changed its location to min X', () => {
      assertEntityLocation(entity, -1.0, 0.0);
    });
  });

  describe('when entity is outside max X', () => {
    beforeEach(() => {
      placeEntityAt(entity, 2.1, 0.0);
      manager.update(1.0);
    });

    test('entity should have changed its location to max X', () => {
      assertEntityLocation(entity, 2.0, 0.0);
    });
  });

  describe('when entity is outside min Y', () => {
    beforeEach(() => {
      placeEntityAt(entity, 0.0, -3.1);
      manager.update(1.0);
    });

    test('entity should have changed its location to min Y', () => {
      assertEntityLocation(entity, 0.0, -3.0);
    });
  });

  describe('when entity is outside max Y', () => {
    beforeEach(() => {
      placeEntityAt(entity, 0.0, 4.1);
      manager.update(1.0);
    });

    test('entity should have changed its location to max Y', () => {
      assertEntityLocation(entity, 0.0, 4.0);
    });
  });
});
