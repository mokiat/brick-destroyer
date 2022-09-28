import ExplosionSystem from './Explosion';
import EntityManager from '../../ecs/Manager';
import LocationComponent from '../component/Location';
import ExplodeOnDestroyComponent from '../component/ExplodeOnDestroy';
import DestroyOnExplodeComponent from '../component/DestroyOnExplode';
import Vector from '../../math/Vector';

describe('ExplosionSystem', () => {
  let explodeEntity;
  let insideRangeEntity;
  let outsideRangeEntity;

  beforeEach(() => {
    const manager = new EntityManager();
    new ExplosionSystem(manager);

    explodeEntity = manager.createEntity();
    explodeEntity.addComponent('location', new LocationComponent());
    explodeEntity.addComponent(
      'explodeOnDestroy',
      new ExplodeOnDestroyComponent({
        explosionRadius: 100.0,
      })
    );

    insideRangeEntity = manager.createEntity();
    insideRangeEntity.addComponent(
      'location',
      new LocationComponent({
        location: new Vector(99.0, 0.0),
      })
    );
    insideRangeEntity.addComponent(
      'destroyOnExplode',
      new DestroyOnExplodeComponent()
    );

    outsideRangeEntity = manager.createEntity();
    outsideRangeEntity.addComponent(
      'location',
      new LocationComponent({
        location: new Vector(-101.0, 0.0),
      })
    );
    outsideRangeEntity.addComponent(
      'destroyOnExplode',
      new DestroyOnExplodeComponent()
    );
  });

  describe('when the explodable entity is destroyed', () => {
    beforeEach(() => {
      explodeEntity.destroy();
    });

    test('the entity inside range is destroyed', () => {
      expect(insideRangeEntity.isDestroyed).toBeTruthy();
    });

    test('the entity outside range is destroyed', () => {
      expect(outsideRangeEntity.isDestroyed).toBeFalsy();
    });
  });
});
