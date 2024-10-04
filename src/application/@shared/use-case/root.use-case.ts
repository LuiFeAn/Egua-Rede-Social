import Notification from '@domain/@shared/notification';
export default abstract class RootUseCase {
  private _notification: Notification;

  get notification() {
    return this._notification;
  }
}
