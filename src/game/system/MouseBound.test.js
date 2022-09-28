import MouseBoundSystem from './MouseBound';
import EntityManager from '../../ecs/Manager';
import LocationComponent from '../component/Location';
import MouseBoundComponent from '../component/MouseBound';

describe('MouseBound', () => {
  let manager;
  let system;
  let noBoundEntity;
  let xBoundEntity;
  let yBoundEntity;
  let allBoundEntity;

  beforeEach(() => {
    manager = new EntityManager();
    system = new MouseBoundSystem(manager);
    manager.addSystem(system);

    noBoundEntity = manager.createEntity();
    noBoundEntity.addComponent('location', new LocationComponent());

    xBoundEntity = manager.createEntity();
    xBoundEntity.addComponent('location', new LocationComponent());
    xBoundEntity.addComponent(
      'mouseBound',
      new MouseBoundComponent({
        axisXBound: true,
        axisYBound: false,
      })
    );

    yBoundEntity = manager.createEntity();
    yBoundEntity.addComponent('location', new LocationComponent());
    yBoundEntity.addComponent(
      'mouseBound',
      new MouseBoundComponent({
        axisXBound: false,
        axisYBound: true,
      })
    );

    allBoundEntity = manager.createEntity();
    allBoundEntity.addComponent('location', new LocationComponent());
    allBoundEntity.addComponent('mouseBound', new MouseBoundComponent());
  });

  describe('when a mouse-move occurs', () => {
    beforeEach(() => {
      system.onMouseMove(13.5, 16.6);
      manager.update(1.0);
    });

    const assertEntityLocation = (entity, expectedX, expectedY) => {
      const locationComp = entity.getComponent('location');
      expect(locationComp.location.x).toBeCloseTo(expectedX);
      expect(locationComp.location.y).toBeCloseTo(expectedY);
    };

    test('unbound entity is not moved', () => {
      assertEntityLocation(noBoundEntity, 0.0, 0.0);
    });

    test('X-bound entity is moved only horizontally', () => {
      assertEntityLocation(xBoundEntity, 13.5, 0.0);
    });

    test('Y-bound entity is moved only vertically', () => {
      assertEntityLocation(yBoundEntity, 0.0, 16.6);
    });

    test('all-bound entity is moved horizontally and vertically', () => {
      assertEntityLocation(allBoundEntity, 13.5, 16.6);
    });
  });
});
