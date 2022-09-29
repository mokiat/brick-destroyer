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

const STATE_STOPPED = 'stopped';
const STATE_LOADING_CONTENT = 'loading-content';
const STATE_DEFEAT = 'defeat';
const STATE_VICTORY = 'victory';
const STATE_RUNNING = 'running';
const STATE_PAUSED = 'paused';

class Controller {
  constructor() {
    this.gameState = STATE_STOPPED;
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
    this.gameState = STATE_RUNNING;
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
    this.mouseBoundSystem.onMouseMove(x, y);
  }

  setBounceEnabled(enabled) {
    this.bounceToggleableSystem.setToggled(enabled);
  }

  update(elapsedSeconds) {
    this.renderer.clear();

    if (this.gameState === STATE_VICTORY) {
      return;
    }

    if (this.gameState === STATE_LOADING_CONTENT) {
      if (this.resourceCollection.isLoaded) {
        this.gameState = STATE_STOPPED;
      }
      return;
    }

    if (this.gameState !== STATE_RUNNING) {
      elapsedSeconds = 0.0;
    }
    this.entityManager.update(elapsedSeconds);

    if (this.victorySystem.isTriggered) {
      this.gameState = STATE_VICTORY;
      // TODO: Notify
      return;
    }
    if (this.defeatSystem.isTriggered) {
      this.gameState = STATE_DEFEAT;
      // TODO: Notify
      return;
    }
  }
}

export default Controller;
