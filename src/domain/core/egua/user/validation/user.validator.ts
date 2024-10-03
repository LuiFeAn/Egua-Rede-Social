import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import Validator from '@domain/@shared/validation/abstract.validator';
import { User } from '../entity/user';
export default class UserValidator extends Validator<User> {
  validate(user: User): void {
    const errors = validateSync(this.map(user));
    errors.forEach((error) => {
      this.notification.add({
        context: 'UserInstance',
        error: Object.values(error.constraints).join(','),
      });
    });
    this.notification.issue();
  }

  private map(user: User) {
    class UserValidation {
      @IsNotEmpty({ message: 'ID is Required' })
      id: string;

      @IsNotEmpty({ message: 'Username is Required' })
      username: string;

      @IsEmail({}, { message: 'The email must be valid' })
      email: string;

      @IsInt({ message: 'The age must be an integer' })
      @Min(18, { message: 'The minimum age is 18 years' })
      @Max(100, { message: 'The maximum age is 100 years' })
      age: number;

      @IsNotEmpty({ message: 'The nickname is required' })
      nickname: string;
    }

    return Object.assign(new UserValidation(), {
      id: user.id,
      username: user.username,
      email: user.email,
      age: user.age,
      nickname: user.nickname,
    });
  }
}
