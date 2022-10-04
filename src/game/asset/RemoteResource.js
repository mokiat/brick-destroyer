import Resource from './Resource';

class RemoteResource extends Resource {
  constructor(path) {
    super();
    this.data = null;
    const resource = this;
    fetch(path)
      .then((res) => res.json())
      .then(
        (data) => {
          resource.data = data;
          resource.setLoaded(true);
        },
        (error) => {
          console.log(`Error reading resource ${path}: ${error}`);
        }
      );
  }

  getData() {
    return this.data;
  }
}

export default RemoteResource;
