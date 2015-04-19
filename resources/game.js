oop.namespace("game");

game.StateStopped = "stopped";
game.StateRunning = "running";
game.StatePaused = "paused";

game.Game = oop.class({
  __create__: function(renderer) {
    this.gameState = game.StateStopped;
    this.wasLoading = true;
    this.currentLevel = 0;

    this.renderer = renderer;

    this.resourceCollection = new brickdest.resource.Collection();
    this.resourceCollection.register("slider_inactive", new brickdest.graphics.Image("/resources/images/slider_inactive.jpg"));
    this.resourceCollection.register("slider_active", new brickdest.graphics.Image("/resources/images/slider_active.jpg"));
    this.resourceCollection.register("ball", new brickdest.graphics.Image("/resources/images/ball.png"));
    this.resourceCollection.register("brick_green", new brickdest.graphics.Image("/resources/images/brick_green.jpg"));
    this.resourceCollection.register("brick_red", new brickdest.graphics.Image("/resources/images/brick_red.jpg"));
    this.resourceCollection.register("brick_grey", new brickdest.graphics.Image("/resources/images/brick_grey.jpg"));
    this.resourceCollection.register("brick_ball", new brickdest.graphics.Image("/resources/images/brick_ball.jpg"));
    this.resourceCollection.register("brick_bounce", new brickdest.graphics.Image("/resources/images/brick_bounce.jpg"));
    this.resourceCollection.register("brick_friction", new brickdest.graphics.Image("/resources/images/brick_friction.jpg"));
    this.resourceCollection.register("brick_gravity", new brickdest.graphics.Image("/resources/images/brick_gravity.jpg"));
    this.resourceCollection.register("brick_star", new brickdest.graphics.Image("/resources/images/brick_star.jpg"));

    this.resourceCollection.register("level0", new brickdest.level.JSONLevel("/resources/levels/level0.json"));
    this.resourceCollection.register("level1", new brickdest.level.JSONLevel("/resources/levels/level1.json"));
    this.resourceCollection.register("level2", new brickdest.level.JSONLevel("/resources/levels/level2.json"));
    this.resourceCollection.register("level3", new brickdest.level.JSONLevel("/resources/levels/level3.json"));

    this.entityManager = new brickdest.ecs.EntityManager();

    var spriteSystem = new brickdest.ecs.SpriteRenderSystem(this.entityManager, this.renderer);
    this.entityManager.addSystem(spriteSystem);
    var motionSystem = new brickdest.ecs.MotionSystem(this.entityManager);
    this.entityManager.addSystem(motionSystem);
  },
  isLoading: function() {
    return !this.resourceCollection.isLoaded();
  },
  isPaused: function() {
    return (this.gameState == game.StatePaused);
  },
  getLevelNumber: function() {
    return this.currentLevel;
  },
  update: function(elapsedSeconds) {
    this.renderer.clear();
    if (this.isLoading()) {
      return;
    }
    if (this.wasLoading) {
      this.wasLoading = false;
      this.initializeLevel(1);
    }
    if (this.gamePaused) {
      return;
    }
    this.entityManager.update(elapsedSeconds);
  },
  initializeLevel: function(number) {
    this.currentLevel = number;
    console.log("Changing to level: " + number);
    // TODO: Through the usage of a level system
  },
  startLevel: function() {
    if (this.isLoading()) {
      console.log("Cannot start level: still loading...");
      return;
    }
    if (this.gameState == game.StateStopped) {
      console.log("Level started: " + this.getLevelNumber());
      this.gameState = game.StateRunning;
    }
  },
  enableSlider: function() {
    console.log("SLIDER: ON");
    // TODO
  },
  disableSlider: function() {
    console.log("SLIDER OFF");
    // TODO
  },
  moveSlider: function(x) {
    if (!this.isPaused()) {
      console.log("MOVE SLIDER: " + x);
      // TODO
    }
  },
  togglePaused: function() {
    switch (this.gameState) {
      case game.StatePaused:
        console.log("Game resumed.");
        this.gameState = game.StateRunning;
        break;
      case game.StateRunning:
        console.log("Game paused.");
        this.gameState = game.StatePaused;
        break;
    }
  }
});
