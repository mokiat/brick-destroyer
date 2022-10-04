import Victory from './Victory';
import EntityManager from '../../ecs/Manager';
import ShouldDestroyComponent from '../component/ShouldDestroy';

describe('Victory', () => {
  let manager;
  let system;
  let firstEntity;
  let secondEntity;

  beforeEach(() => {
    manager = new EntityManager();
    system = new Victory(manager);
    manager.addSystem(system);

    firstEntity = manager.createEntity();
    firstEntity.addComponent('shouldDestroy', new ShouldDestroyComponent());

    secondEntity = manager.createEntity();
    secondEntity.addComponent('shouldDestroy', new ShouldDestroyComponent());

    manager.update(1.0);
  });

  describe('when there are entities that should be destroyed', () => {
    test('the system is not triggered', () => {
      expect(system.isTriggered).toBeFalsy();
    });
  });

  describe('when part of the entities that should be destroyed are left', () => {
    beforeEach(() => {
      firstEntity.destroy();
      manager.update(1.0);
    });

    test('the system is not triggered', () => {
      expect(system.isTriggered).toBeFalsy();
    });
  });

  describe('when no entities that should be destroyed are left', () => {
    beforeEach(() => {
      firstEntity.destroy();
      secondEntity.destroy();
      manager.update(1.0);
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
