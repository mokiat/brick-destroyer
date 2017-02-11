(function(ns, undefined) {

  ns.StateLoadingLevel = "loadingLevel";
  ns.StateLoadingContent = "loadingContent";
  ns.StateGameOver = "gameOver";
  ns.StateVictory = "gameVictory";
  ns.StateStopped = "stopped";
  ns.StateRunning = "running";
  ns.StatePaused = "paused";

  ns.Controller = function(renderer, levelURL) {
    this.renderer = renderer;

    this.currentLevelName = "";
    this.nextLevelURL = null;
    this.loadLevel(levelURL);

    this.createSystems();
  };

  ns.Controller.prototype.createSystems = function() {
    this.resourceCollection = new resources.Collection();
    this.entityManager = new ecs.EntityManager();
    var entityFactory = new game.EntityFactory(this.entityManager, this.resourceCollection);
    this.levelFactory = new game.LevelFactory(entityFactory, this.resourceCollection);

    var spriteSystem = new game.SpriteRenderSystem(this.entityManager, this.renderer);
    this.entityManager.addSystem(spriteSystem);

    this.mouseBoundSystem = new game.MouseBoundSystem(this.entityManager);
    this.entityManager.addSystem(this.mouseBoundSystem);

    this.locationBoundSystem = new game.LocationBoundSystem(this.entityManager);
    this.entityManager.addSystem(this.locationBoundSystem);

    new game.DestroyOnHitSystem(this.entityManager);
    var timerDestroySystem = new game.TimerDestroySystem(this.entityManager);
    this.entityManager.addSystem(timerDestroySystem);
    new game.ExplosionSystem(this.entityManager);
    new game.SpawnOnDestroySystem(this.entityManager, entityFactory);

    var motionSystem = new game.MotionSystem(this.entityManager);
    motionSystem.gravity = new math.Vector(0.0, 435);
    this.entityManager.addSystem(motionSystem);

    this.bounceToggleableSystem = new game.BounceToggleableSystem(this.entityManager);
    this.entityManager.addSystem(this.bounceToggleableSystem);

    this.victorySystem = new game.VictorySystem(this.entityManager);
    this.entityManager.addSystem(this.victorySystem);

    this.defeatSystem = new game.DefeatSystem(this.entityManager);
  };

  ns.Controller.prototype.getGameState = function() {
    return this.gameState;
  };

  ns.Controller.prototype.getLevelName = function() {
    return this.currentLevelName;
  };

  ns.Controller.prototype.update = function(elapsedSeconds) {
    this.renderer.clear();

    if (this.gameState === ns.StateVictory) {
      return;
    }

    if (this.gameState === ns.StateLoadingLevel) {
      if (this.currentLevelResource.isLoaded()) {
        this.gameState = ns.StateLoadingContent;
      } else {
        return;
      }
    }

    if (this.gameState === ns.StateLoadingContent) {
      if (this.resourceCollection.isLoaded()) {
        this.gameState = ns.StateStopped;
        this.initializeLevel();
      } else {
        return;
      }
    }

    if (this.gameState !== ns.StateRunning) {
      elapsedSeconds = 0.0;
    }
    this.entityManager.update(elapsedSeconds);

    if (this.victorySystem.isTriggered()) {
      if (this.nextLevelURL) {
        this.loadLevel(this.nextLevelURL);
      } else {
        this.gameState = ns.StateVictory;
        return;
      }
    }
    if (this.defeatSystem.isTriggered()) {
      this.gameState = ns.StateGameOver;
      return;
    }
  };

  ns.Controller.prototype.loadLevel = function(levelURL) {
    this.gameState = ns.StateLoadingLevel;
    this.currentLevelResource = new resources.RemoteJSONResource(levelURL);
  };

  ns.Controller.prototype.initializeLevel = function() {
    this.entityManager.deleteAllEntities();

    var level = this.currentLevelResource.getData();
    this.currentLevelName = level.name;
    this.nextLevelURL = (level.next || null);
    this.levelFactory.applyLevel(level);

    this.victorySystem.reset();
    this.defeatSystem.reset();
  };

  ns.Controller.prototype.startLevel = function() {
    if (this.gameState === ns.StateStopped) {
      this.gameState = ns.StateRunning;
    }
    if (this.gameState === ns.StateGameOver) {
      this.gameState = ns.StateStopped;
      this.initializeLevel();
    }
  };

  ns.Controller.prototype.enableSlider = function() {
    this.bounceToggleableSystem.setToggled(true);
  };

  ns.Controller.prototype.disableSlider = function() {
    this.bounceToggleableSystem.setToggled(false);
  };

  ns.Controller.prototype.onMouseMove = function(x, y) {
    this.mouseBoundSystem.onMouseMove(x, y);
  };

  ns.Controller.prototype.togglePaused = function() {
    switch (this.gameState) {
      case ns.StatePaused:
        this.gameState = ns.StateRunning;
        break;
      case ns.StateRunning:
        this.gameState = ns.StatePaused;
        break;
    }
  };

})(window.game = window.game || {});
