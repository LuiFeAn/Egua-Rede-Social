import RootEntity from '@domain/@shared/entity/root-entity';
import UserValidatorFactory from '../factory/user.validation.factory';
import IUser from './user.interface';
import { Post } from '../../post/entity/post';
import { PostFactory } from '../../post/factory/post.factory';
import { Password } from './value_object/password/password';
export class User extends RootEntity {
  private _username: string;
  private _email: string;
  private _age: number;
  private _nickname: string;
  private _password: Password;

  constructor({ id, username, email, age, nickname, password }: IUser) {
    super(id);
    this._username = username;
    this._password = password;
    this._email = email;
    this._age = age;
    this._nickname = nickname;
    this.validate();
  }
  validate() {
    UserValidatorFactory.create().validate(this);
  }
  createPost(content: string) {
    return PostFactory.postWithId({
      userId: this.id,
      content,
    });
  }

  like(post: Post) {
    post.addLike(this.id);
  }

  removeLike(post: Post) {
    post.removeLike(this.id);
  }

  deslike(post: Post) {
    post.addDeslike(this.id);
  }

  removeDeslike(post: Post) {
    post.removeDeslike(this.id);
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

  get password() {
    return this._password;
  }
}
