export default abstract class RootEntity {
  private _id: string;
  private _notification: any;

  constructor(id: string) {
    this._id = id;
  }

  abstract validate(): void;

  get id() {
    return this._id;
  }

  get notification() {
    return this._notification;
  }
}
