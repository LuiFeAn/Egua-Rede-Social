import NicknameValidator from './validation/password.validator';

export default class Nickname {
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.validate();
  }
  private validate() {
    new NicknameValidator().validate(this);
  }

  get value() {
    return this._value;
  }
}
