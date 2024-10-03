import Validator from '@domain/@shared/validation/abstract.validator';
import { Post } from '../entity/post';
import PostValidator from '../validation/post.validator';
export class PostValidatorFactory {
  static create(): Validator<Post> {
    return new PostValidator();
  }
}
