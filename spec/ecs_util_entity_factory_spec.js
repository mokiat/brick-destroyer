describe("EntityFactory", function() {
  var locationX = 20.0;
  var locationY = 30.0;
  var decimalPoints = 4;
  var manager;
  var factory;
  var resourceCollection;
  var entity;

  function assertEntityCreated() {
    expect(entity).toBeDefined();
    expect(entity).not.toBeNull();
  }

  function assertEntityLocation() {
    expect(entity.hasComponent("location")).toBeTruthy();
    var locationComp = entity.getComponent("location");
    expect(locationComp.location.x).toBeCloseTo(locationX, decimalPoints);
    expect(locationComp.location.y).toBeCloseTo(locationY, decimalPoints);
  }

  beforeEach(function() {
    resourceCollection = new brickdest.resource.Collection();
    manager = new brickdest.ecs.EntityManager();
    factory = new brickdest.ecs.EntityFactory(manager, resourceCollection);
  });

  describe("Border creation", function() {
    beforeEach(function() {
      entity = factory.createBorder(locationX, locationY, 40.0, 50.0);
    });

    it("entity should be created", function() {
      assertEntityCreated();
    });

    it("entity should have location component", function() {
      assertEntityLocation();
    });

    it("entity should have collision component", function() {
      expect(entity.hasComponent("collision")).toBeTruthy();
      var collisionComp = entity.getComponent("collision");
      expect(collisionComp.deflection).toBeCloseTo(1.0, decimalPoints);
      expect(collisionComp.friction).toBeCloseTo(0.0, decimalPoints);
      var shape = collisionComp.shape;
      expect(shape instanceof brickdest.shape.Rectangle).toBeTruthy();
      expect(shape.width).toBeCloseTo(40.0, decimalPoints);
      expect(shape.height).toBeCloseTo(50.0, decimalPoints);
    });
  });

  describe("Ball creation", function() {
    var ballImage;

    beforeEach(function() {
      ballImage = new brickdest.graphics.IImage();
      resourceCollection.register("ball", ballImage);

      entity = factory.createBall(locationX, locationY);
    });

    it("entity should be created", function() {
      assertEntityCreated();
    });

    it("entity should have location component", function() {
      assertEntityLocation();
    });

    it("entity should have motion component", function() {
      expect(entity.hasComponent("motion")).toBeTruthy();
    });

    it("entity should have collision component", function() {
      expect(entity.hasComponent("collision")).toBeTruthy();
      var collisionComp = entity.getComponent("collision");
      expect(collisionComp.deflection).toBeCloseTo(0.8, decimalPoints);
      expect(collisionComp.friction).toBeCloseTo(0.4, decimalPoints);
      var shape = collisionComp.shape;
      expect(shape instanceof brickdest.shape.Circle).toBeTruthy();
      expect(shape.radius).toBeCloseTo(13.5, decimalPoints);
    });

    it("entity should have sprite component", function() {
      expect(entity.hasComponent("sprite")).toBeTruthy();
      var spriteComp = entity.getComponent("sprite");
      expect(spriteComp.width).toBeCloseTo(28, decimalPoints);
      expect(spriteComp.height).toBeCloseTo(28, decimalPoints);
      expect(spriteComp.image).toEqual(ballImage);
    });
  });

  describe("Slider creation", function() {
    var sliderImage;

    beforeEach(function() {
      sliderImage = new brickdest.graphics.IImage();
      resourceCollection.register("slider_inactive", sliderImage);

      entity = factory.createSlider(locationX, locationY);
    });

    it("entity should be created", function() {
      assertEntityCreated();
    });

    it("entity should have location component", function() {
      assertEntityLocation();
    });

    it("entity should have collision component", function() {
      expect(entity.hasComponent("collision")).toBeTruthy();
      var collisionComp = entity.getComponent("collision");
      expect(collisionComp.deflection).toBeCloseTo(1.0, decimalPoints);
      expect(collisionComp.friction).toBeCloseTo(0.0, decimalPoints);
      var shape = collisionComp.shape;
      expect(shape instanceof brickdest.shape.Rectangle).toBeTruthy();
      expect(shape.width).toBeCloseTo(110.0, decimalPoints);
      expect(shape.height).toBeCloseTo(18.0, decimalPoints);
    });

    it("entity should have sprite component", function() {
      expect(entity.hasComponent("sprite")).toBeTruthy();
      var spriteComp = entity.getComponent("sprite");
      expect(spriteComp.width).toBeCloseTo(110, decimalPoints);
      expect(spriteComp.height).toBeCloseTo(18, decimalPoints);
      expect(spriteComp.image).toEqual(sliderImage);
    });
  });

  describe("Brick creation", function() {
    var brickImage;

    beforeEach(function() {
      brickImage = new brickdest.graphics.IImage();
    });

    function itShouldBehaveLikeABrick() {
      it("entity should be created", function() {
        assertEntityCreated();
      });

      it("entity should have location component", function() {
        assertEntityLocation();
      });

      it("entity should have collision component", function() {
        expect(entity.hasComponent("collision")).toBeTruthy();
        var collisionComp = entity.getComponent("collision");
        expect(collisionComp.deflection).toBeCloseTo(1.0, decimalPoints);
        expect(collisionComp.friction).toBeCloseTo(0.0, decimalPoints);
        var shape = collisionComp.shape;
        expect(shape instanceof brickdest.shape.Rectangle).toBeTruthy();
        expect(shape.width).toBeCloseTo(75.0, decimalPoints);
        expect(shape.height).toBeCloseTo(40.0, decimalPoints);
      });

      it("entity should have sprite component", function() {
        expect(entity.hasComponent("sprite")).toBeTruthy();
        var spriteComp = entity.getComponent("sprite");
        expect(spriteComp.width).toBeCloseTo(75, decimalPoints);
        expect(spriteComp.height).toBeCloseTo(40, decimalPoints);
        expect(spriteComp.image).toEqual(brickImage);
      });
    }

    describe("BRICK_GREEN", function() {
      beforeEach(function() {
        resourceCollection.register("brick_green", brickImage);
        entity = factory.createBrick(locationX, locationY, brickdest.level.BRICK_GREEN);
      });

      itShouldBehaveLikeABrick();
    });

    describe("BRICK_RED", function() {
      beforeEach(function() {
        resourceCollection.register("brick_red", brickImage);
        entity = factory.createBrick(locationX, locationY, brickdest.level.BRICK_RED);
      });

      itShouldBehaveLikeABrick();
    });

    describe("BRICK_GREY", function() {
      beforeEach(function() {
        resourceCollection.register("brick_grey", brickImage);
        entity = factory.createBrick(locationX, locationY, brickdest.level.BRICK_GREY);
      });

      itShouldBehaveLikeABrick();
    });

    describe("BRICK_STAR", function() {
      beforeEach(function() {
        resourceCollection.register("brick_star", brickImage);
        entity = factory.createBrick(locationX, locationY, brickdest.level.BRICK_STAR);
      });

      itShouldBehaveLikeABrick();
    });

    describe("BRICK_BALL", function() {
      beforeEach(function() {
        resourceCollection.register("brick_ball", brickImage);
        entity = factory.createBrick(locationX, locationY, brickdest.level.BRICK_BALL);
      });

      itShouldBehaveLikeABrick();
    });

    describe("BRICK_GRAVITY", function() {
      beforeEach(function() {
        resourceCollection.register("brick_gravity", brickImage);
        entity = factory.createBrick(locationX, locationY, brickdest.level.BRICK_GRAVITY);
      });

      itShouldBehaveLikeABrick();
    });

    describe("BRICK_FRICTION", function() {
      beforeEach(function() {
        resourceCollection.register("brick_friction", brickImage);
        entity = factory.createBrick(locationX, locationY, brickdest.level.BRICK_FRICTION);
      });

      itShouldBehaveLikeABrick();
    });

    describe("BRICK_BOUNCE", function() {
      beforeEach(function() {
        resourceCollection.register("brick_bounce", brickImage);
        entity = factory.createBrick(locationX, locationY, brickdest.level.BRICK_BOUNCE);
      });

      itShouldBehaveLikeABrick();
    });
  });
});
