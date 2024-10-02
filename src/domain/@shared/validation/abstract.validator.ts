import Notification from '../notification';

export default abstract class Validator<T> {
  private _notification: Notification = new Notification();

  abstract validate(entity: T): void;

  get notification() {
    return this._notification;
  }
}
