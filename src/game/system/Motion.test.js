import MotionSystem from './Motion';
import EntityManager from '../../ecs/Manager';
import LocationComponent from '../component/Location';
import MotionComponent from '../component/Motion';
import CollisionComponent from '../component/Collision';
import CollisionEvent from '../event/Collision';
import Circle from '../../shape/Circle';
import Rectangle from '../../shape/Rectangle';
import Vector from '../../math/Vector';

describe('Motion', () => {
  let manager;
  let system;
  let entity;
  let obstacle;
  let listener;

  beforeEach(() => {
    manager = new EntityManager();
    system = new MotionSystem(manager);
    manager.addSystem(system);
    listener = {
      onEvent: () => {},
    };
    jest.spyOn(listener, 'onEvent');
    manager.subscribe([], listener.onEvent);
  });

  test('has default gravity equal to 0.0/0.0', () => {
    expect(system.gravity.x).toBeCloseTo(0.0);
    expect(system.gravity.y).toBeCloseTo(0.0);
  });

  describe('when entity moves in a gravity field', () => {
    beforeEach(() => {
      system.gravity = new Vector(1.2, 3.4);

      entity = manager.createEntity();
      entity.addComponent(
        'location',
        new LocationComponent({
          location: new Vector(11.3, 5.4),
        })
      );
      entity.addComponent(
        'motion',
        new MotionComponent({
          speed: new Vector(1.0, -2.0),
        })
      );

      manager.update(2.0);
    });

    test('the speed should have changed accordingly', () => {
      // speed = old_speed + acceleration * delta_time
      const motion = entity.getComponent('motion');
      expect(motion.speed.x).toBeCloseTo(3.4);
      expect(motion.speed.y).toBeCloseTo(4.8);
    });

    test('the location should have changed accordingly', () => {
      // distance = (old_speed + new_speed) * delta_time * 0.5
      const location = entity.getComponent('location');
      expect(location.location.x).toBeCloseTo(15.7);
      expect(location.location.y).toBeCloseTo(8.2);
    });

    describe('when entity accelerates for a vely long period of time', () => {
      beforeEach(() => {
        manager.update(10.0 * 60.0);
      });

      // This limitation is so that processing is not too much
      test('the speed should not be bigger than 1000', () => {
        const motion = entity.getComponent('motion');
        expect(motion.speed.length).toBeCloseTo(1000.0);
      });
    });
  });

  describe('when entity collides with a very thin obstacle', () => {
    beforeEach(() => {
      entity = manager.createEntity();

      entity.addComponent(
        'location',
        new LocationComponent({
          location: new Vector(-4.0, -5.1),
        })
      );

      entity.addComponent(
        'motion',
        new MotionComponent({
          speed: new Vector(1.0, 1.0),
        })
      );

      entity.addComponent(
        'collision',
        new CollisionComponent({
          shape: new Circle({
            radius: 1.0,
          }),
          friction: 0.0,
          deflection: 1.0,
        })
      );

      obstacle = manager.createEntity();

      obstacle.addComponent(
        'location',
        new LocationComponent({
          location: new Vector(),
        })
      );

      obstacle.addComponent(
        'collision',
        new CollisionComponent({
          shape: new Rectangle({
            width: 3.0,
            height: 0.2,
          }),
          friction: 0.0,
          deflection: 1.0,
        })
      );
    });

    describe('when there is no friction and maximum deflection', () => {
      beforeEach(() => {
        manager.update(8.0);
      });

      test('a collision event should be reported for the moving entity', () => {
        expect(listener.onEvent).toHaveBeenCalledTimes(2);
        expect(listener.onEvent).toHaveBeenNthCalledWith(
          1,
          entity,
          new CollisionEvent({
            obstacle: obstacle,
            collisionNormal: new Vector(0.0, -1.0),
          })
        );
      });

      test('a collision event should be reported for the obstacle entity', () => {
        expect(listener.onEvent).toHaveBeenCalledTimes(2);
        expect(listener.onEvent).toHaveBeenNthCalledWith(
          2,
          obstacle,
          new CollisionEvent({
            obstacle: entity,
            collisionNormal: new Vector(-0.0, 1.0),
          })
        );
      });

      test('the object should have changed its speed accordingly', () => {
        const motionComp = entity.getComponent('motion');
        expect(motionComp.speed.x).toBeCloseTo(1.0);
        expect(motionComp.speed.y).toBeCloseTo(-1.0);
      });

      test('the object should have changed its location accordingly', () => {
        const locationComp = entity.getComponent('location');
        expect(locationComp.location.x).toBeCloseTo(4.0);
        expect(locationComp.location.y).toBeCloseTo(-5.1);
      });
    });

    describe('when deflection is lowered', () => {
      beforeEach(() => {
        entity.getComponent('collision').deflection = 0.5;
        obstacle.getComponent('collision').deflection = 0.5;

        manager.update(8.0);
      });

      test('the object should have changed its speed accordingly', () => {
        const motionComp = entity.getComponent('motion');
        expect(motionComp.speed.x).toBeCloseTo(1.0);
        expect(motionComp.speed.y).toBeCloseTo(-0.25);
      });

      test('the object should have changed its location accordingly', () => {
        const locationComp = entity.getComponent('location');
        expect(locationComp.location.x).toBeCloseTo(4.0);
        expect(locationComp.location.y).toBeCloseTo(-2.1);
      });
    });

    describe('when friction is increased', () => {
      beforeEach(() => {
        entity.getComponent('collision').friction = 0.5;
        obstacle.getComponent('collision').friction = 0.5;

        manager.update(8.0);
      });

      test('the object should have changed its speed accordingly', () => {
        const motionComp = entity.getComponent('motion');
        expect(motionComp.speed.x).toBeCloseTo(0.75);
        expect(motionComp.speed.y).toBeCloseTo(-1.0);
      });

      test('the object should have changed its location accordingly', () => {
        const locationComp = entity.getComponent('location');
        expect(locationComp.location.x).toBeCloseTo(3.0);
        expect(locationComp.location.y).toBeCloseTo(-5.1);
      });
    });

    describe('when obstacle is movable', () => {
      beforeEach(() => {
        obstacle.addComponent('motion', new MotionComponent());

        manager.update(8.0);
      });

      // We don't support collision between moving objects for now
      test('the two objects should not have collided', () => {
        expect(listener.onEvent).not.toHaveBeenCalled();
      });
    });
  });
});
