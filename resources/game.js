oop.namespace("game");

game.StateLoadingLevel = "loadingLevel";
game.StateLoadingContent = "loadingContent";
game.StateGameOver = "gameOver";
game.StateVictory = "gameVictory";
game.StateStopped = "stopped";
game.StateRunning = "running";
game.StatePaused = "paused";

game.Game = oop.class({
  __create__: function(renderer, levelURL) {
    this.renderer = renderer;

    this.currentLevelName = "";
    this.nextLevelURL = null;
    this.loadLevel(levelURL);

    this.createSystems();
  },
  createSystems: function() {
    this.resourceCollection = new brickdest.resource.Collection();
    this.entityManager = new brickdest.ecs.EntityManager();
    var entityFactory = new brickdest.ecs.EntityFactory(this.entityManager, this.resourceCollection);
    this.levelFactory = new brickdest.ecs.LevelFactory(entityFactory, this.resourceCollection);

    var spriteSystem = new brickdest.ecs.SpriteRenderSystem(this.entityManager, this.renderer);
    this.entityManager.addSystem(spriteSystem);

    this.mouseBoundSystem = new brickdest.ecs.MouseBoundSystem(this.entityManager);
    this.entityManager.addSystem(this.mouseBoundSystem);

    this.locationBoundSystem = new brickdest.ecs.LocationBoundSystem(this.entityManager);
    this.entityManager.addSystem(this.locationBoundSystem);

    new brickdest.ecs.DestroyOnHitSystem(this.entityManager);
    new brickdest.ecs.SpawnOnDestroySystem(this.entityManager, entityFactory);

    var motionSystem = new brickdest.ecs.MotionSystem(this.entityManager);
    motionSystem.gravity = new brickdest.math.Vector(0.0, 435);
    this.entityManager.addSystem(motionSystem);

    this.bounceTogglableSystem = new brickdest.ecs.BounceTogglableSystem(this.entityManager);
    this.entityManager.addSystem(this.bounceTogglableSystem);

    this.victorySystem = new brickdest.ecs.VictorySystem(this.entityManager);
    this.entityManager.addSystem(this.victorySystem);

    this.defeatSystem = new brickdest.ecs.DefeatSystem(this.entityManager);
  },
  getGameState: function() {
    return this.gameState;
  },
  getLevelName: function() {
    return this.currentLevelName;
  },
  update: function(elapsedSeconds) {
    this.renderer.clear();

    if (this.gameState === game.StateVictory) {
      return;
    }

    if (this.gameState === game.StateLoadingLevel) {
      if (this.currentLevelResource.isLoaded()) {
        this.gameState = game.StateLoadingContent;
      } else {
        return;
      }
    }

    if (this.gameState === game.StateLoadingContent) {
      if (this.resourceCollection.isLoaded()) {
        this.gameState = game.StateStopped;
        this.initializeLevel();
      } else {
        return;
      }
    }

    if (this.gameState !== game.StateRunning) {
      elapsedSeconds = 0.0;
    }
    this.entityManager.update(elapsedSeconds);

    if (this.victorySystem.isTriggered()) {
      if (this.nextLevelURL) {
        this.loadLevel(this.nextLevelURL);
      } else {
        this.gameState = game.StateVictory;
        return;
      }
    }
    if (this.defeatSystem.isTriggered()) {
      this.gameState = game.StateGameOver;
      return;
    }
  },
  loadLevel: function(levelURL) {
    this.gameState = game.StateLoadingLevel;
    this.currentLevelResource = new brickdest.resource.RemoteJSONResource(levelURL)
  },
  initializeLevel: function() {
    this.entityManager.deleteAllEntities();

    var level = this.currentLevelResource.getData();
    this.currentLevelName = level.name;
    this.nextLevelURL = (level.next || null);
    this.levelFactory.applyLevel(level);

    this.victorySystem.reset();
    this.defeatSystem.reset();
  },
  startLevel: function() {
    if (this.gameState === game.StateStopped) {
      this.gameState = game.StateRunning;
    }
    if (this.gameState === game.StateGameOver) {
      this.gameState = game.StateStopped;
      this.initializeLevel();
    }
  },
  enableSlider: function() {
    this.bounceTogglableSystem.setToggled(true);
  },
  disableSlider: function() {
    this.bounceTogglableSystem.setToggled(false);
  },
  onMouseMove: function(x, y) {
    this.mouseBoundSystem.onMouseMove(x, y);
  },
  togglePaused: function() {
    switch (this.gameState) {
      case game.StatePaused:
        this.gameState = game.StateRunning;
        break;
      case game.StateRunning:
        this.gameState = game.StatePaused;
        break;
    }
  }
});
