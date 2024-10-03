import Validator from '@domain/@shared/validation/abstract.validator';
import { User } from '../entity/user';
import UserValidator from '../validation/user.validator';

export default class UserValidatorFactory {
  static create(): Validator<User> {
    return new UserValidator();
  }
}
