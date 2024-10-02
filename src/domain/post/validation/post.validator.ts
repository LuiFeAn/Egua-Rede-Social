import Validator from '@domain/@shared/validation/abstract.validator';
import { Post } from '../entity/post';

export default class PostValidator extends Validator<Post> {
  validate(entity: Post): void {
    if (!(entity.content.length >= 0 && entity.content.length <= 550)) {
      this.notification.add({
        context: 'PostInstance',
        error: 'Invalid Content Length',
      });
      this.notification.issue();
    }
  }
}
