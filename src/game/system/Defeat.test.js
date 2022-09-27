import Defeat from './Defeat';
import EntityManager from '../../ecs/Manager';
import ShouldNotDestroyComponent from '../component/ShouldNotDestroy';

describe('Defeat', () => {
  let manager;
  let system;
  let entity;

  beforeEach(() => {
    manager = new EntityManager();
    system = new Defeat(manager);

    entity = manager.createEntity();
    entity.addComponent('shouldNotDestroy', new ShouldNotDestroyComponent());
  });

  test('system is not triggered by default', () => {
    expect(system.isTriggered).toBeFalsy();
  });

  describe('when an entity that should not be destroyed is destroyed', () => {
    beforeEach(() => {
      entity.destroy();
    });

    test('the system is triggered', () => {
      expect(system.isTriggered).toBeTruthy();
    });

    describe('when the system is reset', () => {
      beforeEach(() => {
        system.reset();
      });

      test('the system is no longer triggered', () => {
        expect(system.isTriggered).toBeFalsy();
      });
    });
  });
});
