import Validator from '@domain/@shared/validation/abstract.validator';
import { Password } from '../password';
import { IsStrongPassword, validateSync } from 'class-validator';
import mapClassValidatorErrors from '@utils/mapClassValidatorErrors';
export default class PasswordValidator extends Validator<Password> {
  validate(password: Password): void {
    const errors = validateSync(this.map(password));
    errors.forEach((error) => {
      this.notification.add({
        context: 'PasswordInstance',
        error: mapClassValidatorErrors(error),
      });
    });
    this.notification.issue();
  }

  private map(password: Password) {
    class PasswordValidation {
      @IsStrongPassword(
        {
          minLength: 9,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 1,
        },
        {
          message:
            'The password must be 9 characteres, 1 number, 1 special character and 1 upperCase',
        },
      )
      password: string;
    }

    return Object.assign(new PasswordValidation(), {
      password: password.value,
    });
  }
}
