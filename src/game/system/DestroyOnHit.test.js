import DestroyOnHitSystem from './DestroyOnHit';
import EntityManager from '../../ecs/Manager';
import CollisionComponent from '../component/Collision';
import DestroyOnHitComponent from '../component/DestroyOnHit';
import CollisionEvent from '../event/Collision';
import Vector from '../../math/Vector';

describe('DestroyOnHit', () => {
  let entity;
  let obstacle;

  beforeEach(() => {
    const manager = new EntityManager();
    new DestroyOnHitSystem(manager);

    entity = manager.createEntity();
    entity.addComponent('collision', new CollisionComponent());
    entity.addComponent('destroyOnHit', new DestroyOnHitComponent());

    obstacle = manager.createEntity();
    obstacle.addComponent('collision', new CollisionComponent());
  });

  describe('when entity collides with obstacle', () => {
    beforeEach(() => {
      entity.throwEvent(
        new CollisionEvent({
          obstacle: obstacle,
          collisionNormal: new Vector(),
        })
      );
    });

    test('the entity is destroyed', () => {
      expect(entity.isDestroyed).toBeTruthy();
    });

    test('obstacle is not destroyed if not destroy on hit', () => {
      expect(obstacle.isDestroyed).toBeFalsy();
    });
  });
});
