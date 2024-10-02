import { NotificationError } from '../errors/notification-error';
import INotificationProps from './interface';

export default class Notification {
  private errors: INotificationProps[] = [];
  add(error: INotificationProps) {
    this.errors.push(error);
  }

  issue() {
    if (this.errors.length > 0) {
      let message = this.errors
        .map((item) => {
          const field = item.field ? `[${item.field}]` : '';
          return `${item.context}${field}: ${item.error}`;
        })
        .join(', ');
      throw new NotificationError(message);
    }
  }

  get length() {
    return this.errors.length;
  }
}
