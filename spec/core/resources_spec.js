describe("Resource", function() {
  var res;

  beforeEach(function() {
    res = new resources.Resource();
  });

  it("is not loaded by default", function() {
    expect(res.isLoaded()).toBeFalsy();
  });

  describe("when resource is loaded", function() {
    beforeEach(function() {
      res.setLoaded(true);
    });

    it("is loaded", function() {
      expect(res.isLoaded()).toBeTruthy();
    });
  });
});

describe("Collection", function() {
  var collection;

  beforeEach(function() {
    collection = new resources.Collection();
  });

  it("collection is loaded by default", function() {
    expect(collection.isLoaded()).toBeTruthy();
  });

  it("collection returns undefined when finding missing resource", function() {
    expect(collection.find("missing")).toBeUndefined();
  });

  describe("when resources are registered", function() {
    var firstResource;
    var secondResource;

    beforeEach(function() {
      firstResource = new resources.Resource();
      collection.register("first", firstResource);
      secondResource = new resources.Resource();
      collection.register("second", secondResource);
    });

    it("is possible to find resources", function() {
      expect(collection.find("first")).toEqual(firstResource);
      expect(collection.find("second")).toEqual(secondResource);
    });

    describe("when all resources are not loaded", function() {
      it("collection is not loaded", function() {
        expect(collection.isLoaded()).toBeFalsy();
      });
    });

    describe("when some of the resources are not loaded", function() {
      beforeEach(function() {
        secondResource.setLoaded(true);
      });

      it("collection is not loaded", function() {
        expect(collection.isLoaded()).toBeFalsy();
      });
    });

    describe("when all resources are loaded", function() {
      beforeEach(function() {
        firstResource.setLoaded(true);
        secondResource.setLoaded(true);
      });

      it("collection is loaded", function() {
        expect(collection.isLoaded()).toBeTruthy();
      });
    });

    describe("when resources are unregistered", function() {
      beforeEach(function() {
        collection.unregister("first");
        collection.unregister("second");
      });

      it("resources cannot be found anymore", function() {
        expect(collection.find("first")).toBeUndefined();
        expect(collection.find("second")).toBeUndefined();
      });

      it("collection is loaded", function() {
        expect(collection.isLoaded()).toBeTruthy();
      });
    });
  });
});
