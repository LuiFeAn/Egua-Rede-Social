import { compare, hash } from 'bcrypt';
import PasswordValidator from './validation/password.validator';
export class Password {
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.validate();
  }

  private validate() {
    new PasswordValidator().validate(this);
  }

  async hashPassword(salt = 9) {
    this._value = await hash(this._value, salt);
  }

  public checkPassword(password: string): Promise<boolean> {
    return compare(password, this._value);
  }

  get value() {
    return this._value;
  }
}
