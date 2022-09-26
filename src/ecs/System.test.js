import Manager from './Manager';
import System from './System';

describe('System', () => {
  var manager;
  var firstSystem;
  var secondSystem;

  beforeEach(() => {
    firstSystem = new System();
    jest.spyOn(firstSystem, 'update');
    secondSystem = new System();
    jest.spyOn(secondSystem, 'update');

    manager = new Manager();
    manager.addSystem(firstSystem);
    manager.addSystem(secondSystem);
  });

  it('gets updated when manager is updated', () => {
    manager.update(1.5);
    expect(firstSystem.update).toHaveBeenCalledWith(1.5);
    expect(secondSystem.update).toHaveBeenCalledWith(1.5);
  });
});
