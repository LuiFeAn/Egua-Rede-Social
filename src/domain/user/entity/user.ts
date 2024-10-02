import RootEntity from '@domain/@shared/entity/root-entity';
import UserValidatorFactory from '../factory/user.validation.factory';
import IUser from './user.interface';

export class User extends RootEntity {
  private _username: string;
  private _email: string;
  private _age: number;
  private _nickname: string;
  private _following: number = 0;
  private _followers: number = 0;

  constructor({ id, username, email, age, nickname }: IUser) {
    super(id);
    this._username = username;
    this._email = email;
    this._age = age;
    this._nickname = nickname;
    this.validate();
  }

  validate() {
    UserValidatorFactory.create().validate(this);
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get age() {
    return this._age;
  }

  get nickname() {
    return this._nickname;
  }

  get following() {
    return this._following;
  }

  get followers() {
    return this._followers;
  }
}
