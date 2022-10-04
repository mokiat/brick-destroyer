import SpawnOnDestroySystem from './SpawnOnDestroy';
import EntityManager from '../../ecs/Manager';
import EntityFactory from '../factory/Entity';
import Collection from '../asset/Collection';
import Vector from '../../math/Vector';
import LocationComponent from '../component/Location';
import SpawnOnDestroyComponent from '../component/SpawnOnDestroy';

describe('SpawnOnDestroy', () => {
  let manager;
  let system;
  let entity;

  beforeEach(() => {
    manager = new EntityManager();
    const resourceCollection = new Collection();
    const entityFactory = new EntityFactory(manager, resourceCollection);
    system = new SpawnOnDestroySystem(manager, entityFactory);
    manager.addSystem(system);

    entity = manager.createEntity();
    entity.addComponent(
      'location',
      new LocationComponent({
        location: new Vector(1.2, 3.4),
      })
    );
    entity.addComponent(
      'spawnOnDestroy',
      new SpawnOnDestroyComponent({
        definition: {
          motion: {
            speed: {
              x: 13.4,
              y: 45.1,
            },
          },
        },
      })
    );
  });

  describe('when an entity is destroyed', () => {
    beforeEach(() => {
      entity.destroy();
    });

    test('old entity is destroyed', () => {
      expect(entity.isDestroyed).toBeTruthy();
    });

    test('an entity should have been created', () => {
      const entities = manager.listEntities();
      expect(entities.length).toEqual(1);
      const spawnedEntity = entities[0];
      expect(spawnedEntity).not.toEqual(entity);
      expect(spawnedEntity.isDestroyed).toBeFalsy();
    });

    test("the spawned entity is old entity's location", () => {
      const spawnedEntity = manager.listEntities()[0];
      expect(spawnedEntity.hasComponent('location')).toBeTruthy();
      const locationComp = spawnedEntity.getComponent('location');
      expect(locationComp.location.x).toBeCloseTo(1.2);
      expect(locationComp.location.y).toBeCloseTo(3.4);
    });

    test("the spawned entity should have all of it's definition components", () => {
      const spawnedEntity = manager.listEntities()[0];
      expect(spawnedEntity.hasComponent('motion')).toBeTruthy();
      const motionComp = spawnedEntity.getComponent('motion');
      expect(motionComp.speed.x).toBeCloseTo(13.4);
      expect(motionComp.speed.y).toBeCloseTo(45.1);
    });
  });
});
