export default abstract class RootEntity {
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  abstract validate(): void;

  get id() {
    return this._id;
  }
}
