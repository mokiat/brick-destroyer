import ResourceCollection from './asset/Collection';
import EntityManager from '../ecs/Manager';
import EntityFactory from './factory/Entity';
import LevelFactory from './factory/Level';
import SpriteRenderSystem from './system/SpriteRender';
import MouseBoundSystem from './system/MouseBound';
import LocationBoundSystem from './system/LocationBound';
import DestroyOnHitSystem from './system/DestroyOnHit';
import TimerDestroySystem from './system/TimerDestroy';
import ExplosionSystem from './system/Explosion';
import SpawnOnDestroySystem from './system/SpawnOnDestroy';
import MotionSystem from './system/Motion';
import BounceToggleableSystem from './system/BounceToggleable';
import VictorySystem from './system/Victory';
import DefeatSystem from './system/Defeat';
import Vector from '../math/Vector';

export const STATE_UNINITIALIZED = 'uninitilized';
export const STATE_STOPPED = 'stopped';
export const STATE_LOADING_CONTENT = 'loading-content';
export const STATE_DEFEAT = 'defeat';
export const STATE_VICTORY = 'victory';
export const STATE_RUNNING = 'running';
export const STATE_PAUSED = 'paused';

class Controller {
  constructor() {
    this.gameState = STATE_UNINITIALIZED;
    this.onVictory = () => {};
    this.onDefeat = () => {};
  }

  initialize(renderer) {
    this.renderer = renderer;
    this.resourceCollection = new ResourceCollection();
    this.entityManager = new EntityManager();
    const entityFactory = new EntityFactory(
      this.entityManager,
      this.resourceCollection
    );
    this.levelFactory = new LevelFactory(
      entityFactory,
      this.resourceCollection
    );
    const spriteSystem = new SpriteRenderSystem(
      this.entityManager,
      this.renderer
    );
    this.entityManager.addSystem(spriteSystem);

    this.mouseBoundSystem = new MouseBoundSystem(this.entityManager);
    this.entityManager.addSystem(this.mouseBoundSystem);

    this.locationBoundSystem = new LocationBoundSystem(this.entityManager);
    this.entityManager.addSystem(this.locationBoundSystem);

    new DestroyOnHitSystem(this.entityManager);
    const timerDestroySystem = new TimerDestroySystem(this.entityManager);
    this.entityManager.addSystem(timerDestroySystem);
    new ExplosionSystem(this.entityManager);
    new SpawnOnDestroySystem(this.entityManager, entityFactory);

    const motionSystem = new MotionSystem(this.entityManager);
    motionSystem.gravity = new Vector(0.0, 435);
    this.entityManager.addSystem(motionSystem);

    this.bounceToggleableSystem = new BounceToggleableSystem(
      this.entityManager
    );
    this.entityManager.addSystem(this.bounceToggleableSystem);

    this.victorySystem = new VictorySystem(this.entityManager);
    this.entityManager.addSystem(this.victorySystem);

    this.defeatSystem = new DefeatSystem(this.entityManager);

    let start = performance.now();
    const step = (timestamp) => {
      const delta = timestamp - start;
      this.update(delta / 1000.0);
      start = timestamp;
      this.frameRequest = requestAnimationFrame(step);
    };
    this.frameRequest = requestAnimationFrame(step);
  }

  release() {
    cancelAnimationFrame(this.frameRequest);
  }

  get state() {
    return this.gameState;
  }

  notify(onVictory, onDefeat) {
    this.onVictory = onVictory;
    this.onDefeat = onDefeat;
  }

  changeLevel(level) {
    this.entityManager.deleteAllEntities();
    this.victorySystem.reset();
    this.defeatSystem.reset();
    if (level === undefined || level === null) {
      this.gameState = STATE_STOPPED;
    } else {
      this.gameState = STATE_LOADING_CONTENT;
      this.levelFactory.applyLevel(level);
    }
  }

  startLevel() {
    if (this.gameState === STATE_STOPPED) {
      this.gameState = STATE_RUNNING;
    }
  }

  togglePaused() {
    switch (this.gameState) {
      case STATE_PAUSED:
        this.gameState = STATE_RUNNING;
        break;
      case STATE_RUNNING:
        this.gameState = STATE_PAUSED;
        break;
      default:
        break;
    }
  }

  moveSlider(x, y) {
    if (this.gameState === STATE_STOPPED || this.gameState === STATE_RUNNING) {
      this.mouseBoundSystem.onMouseMove(x, y);
    }
  }

  setBounceEnabled(enabled) {
    if (this.gameState === STATE_RUNNING) {
      this.bounceToggleableSystem.setToggled(enabled);
    }
  }

  update(elapsedSeconds) {
    this.renderer.clear();

    switch (this.gameState) {
      case STATE_LOADING_CONTENT:
        if (this.resourceCollection.isLoaded) {
          this.gameState = STATE_STOPPED;
        }
        return;
      case STATE_STOPPED:
      case STATE_VICTORY:
      case STATE_DEFEAT:
      case STATE_PAUSED:
        this.entityManager.update(0.0);
        return;
      case STATE_RUNNING:
        this.entityManager.update(elapsedSeconds);
        if (this.victorySystem.isTriggered) {
          this.onVictory();
          this.gameState = STATE_VICTORY;
          return;
        }
        if (this.defeatSystem.isTriggered) {
          this.onDefeat();
          this.gameState = STATE_DEFEAT;
          return;
        }
        return;
      default:
        return;
    }
  }
}

export default Controller;
