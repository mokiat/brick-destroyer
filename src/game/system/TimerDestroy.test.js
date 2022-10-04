import EntityManager from '../../ecs/Manager';
import TimerDestroySystem from './TimerDestroy';
import TimerDestroyComponent from '../component/TimerDestroy';

describe('TimerDestroy', () => {
  let manager;
  let entity;

  beforeEach(() => {
    manager = new EntityManager();
    const system = new TimerDestroySystem(manager);
    manager.addSystem(system);

    entity = manager.createEntity();
    entity.addComponent(
      'timerDestroy',
      new TimerDestroyComponent({
        timeout: 3.5,
      })
    );
  });

  describe('when insufficient time has elapsed', () => {
    beforeEach(() => {
      manager.update(3.2);
    });

    test("the entity's timeout should have been updated", () => {
      const timerDestroyComp = entity.getComponent('timerDestroy');
      expect(timerDestroyComp.timeout).toBeCloseTo(0.3);
    });

    test('the entity should not have been destroyed', () => {
      expect(entity.isDestroyed).toBeFalsy();
    });
  });

  describe('when sufficient time has elapsed', () => {
    beforeEach(() => {
      manager.update(3.51);
    });

    test('the entity should have been destroyed', () => {
      expect(entity.isDestroyed).toBeTruthy();
    });
  });
});
