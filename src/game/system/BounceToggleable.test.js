import BounceToggleableSystem from './BounceToggleable';
import EntityManager from '../../ecs/Manager';
import LocationComponent from '../component/Location';
import CollisionComponent from '../component/Collision';
import SpriteComponent from '../component/Sprite';
import MotionComponent from '../component/Motion';
import BounceToggleableComponent from '../component/BounceToggleable';
import CollisionEvent from '../event/Collision';
import Resource from '../asset/Resource';
import Vector from '../../math/Vector';

describe('BounceToggleable', () => {
  let manager;
  let system;
  let entity;
  let otherEntity;
  let activeImage;
  let inactiveImage;

  beforeEach(() => {
    manager = new EntityManager();
    system = new BounceToggleableSystem(manager);
    manager.addSystem(system);

    activeImage = new Resource();
    inactiveImage = new Resource();

    entity = manager.createEntity();
    entity.addComponent('location', new LocationComponent());
    entity.addComponent('collision', new CollisionComponent());
    entity.addComponent(
      'bounceToggleable',
      new BounceToggleableComponent({
        activeImage: activeImage,
        inactiveImage: inactiveImage,
        deflection: new Vector(2.0, 2.0),
      })
    );
    entity.addComponent('sprite', new SpriteComponent());

    otherEntity = manager.createEntity();
    otherEntity.addComponent(
      'location',
      new LocationComponent({
        location: new Vector(4.0, -2.0),
      })
    );
    otherEntity.addComponent(
      'motion',
      new MotionComponent({
        speed: new Vector(1.0, -1.0),
      })
    );

    manager.update(1.0);
  });

  test('by default system is not toggled', () => {
    expect(system.isToggled).toBeFalsy();
  });

  test('the entity has the inactive image set', () => {
    const spriteComp = entity.getComponent('sprite');
    expect(spriteComp.image).toBe(inactiveImage);
  });

  describe('when an entity collides with the toggleable one', () => {
    beforeEach(() => {
      entity.throwEvent(
        new CollisionEvent({
          obstacle: otherEntity,
          collisionNormal: new Vector(0.0, -1.0),
        })
      );
    });

    test("the entity should have changed it's horizontal speed", () => {
      const motionComp = otherEntity.getComponent('motion');
      expect(motionComp.speed.x).toBeCloseTo(9.0);
      expect(motionComp.speed.y).toBeCloseTo(-1.0);
    });
  });

  describe('when system is toggled', () => {
    beforeEach(() => {
      system.setToggled(true);
      manager.update(1.0);
    });

    test('the system is toggled', () => {
      expect(system.isToggled).toBeTruthy();
    });

    test('the entity has the active image set', () => {
      const spriteComp = entity.getComponent('sprite');
      expect(spriteComp.image).toBe(activeImage);
    });

    describe('when an entity collides with the toggleable one', () => {
      beforeEach(() => {
        entity.throwEvent(
          new CollisionEvent({
            obstacle: otherEntity,
            collisionNormal: new Vector(0.0, -1.0),
          })
        );
      });

      test("the entity should not have changed it's horizontal and vertical speed", () => {
        const motionComp = otherEntity.getComponent('motion');
        expect(motionComp.speed.x).toBeCloseTo(9.0);
        expect(motionComp.speed.y).toBeCloseTo(-5.0);
      });
    });

    describe('when the system is untoggled', () => {
      beforeEach(() => {
        system.setToggled(false);
        manager.update(1.0);
      });

      test('system is back to untoggled state', () => {
        expect(system.isToggled).toBeFalsy();
      });
    });
  });
});
