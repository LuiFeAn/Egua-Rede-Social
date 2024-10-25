import Validator from '@domain/@shared/validation/abstract.validator';
import Nickname from '../nickname';
import { IsString, MaxLength, MinLength, validateSync } from 'class-validator';
import mapClassValidatorErrors from '@utils/mapClassValidatorErrors';
export default class NicknameValidator extends Validator<Nickname> {
  validate(nickname: Nickname): void {
    const errors = validateSync(this.map(nickname));
    errors.forEach((error) => {
      this.notification.add({
        context: 'PasswordInstance',
        error: mapClassValidatorErrors(error),
      });
    });
    this.notification.issue();
  }

  private map(nickname: Nickname) {
    class NicknameValidation {
      @IsString()
      @MaxLength(12, {
        message: 'Nickname must be only 12 characters',
      })
      @MinLength(6, {
        message: 'Nickname must be at least 6 characters',
      })
      nickname: string;
    }

    return Object.assign(new NicknameValidation(), {
      nickname: nickname.value,
    });
  }
}
