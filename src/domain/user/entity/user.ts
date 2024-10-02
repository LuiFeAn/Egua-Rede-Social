import RootEntity from '@domain/@shared/entity/root-entity';
import UserValidatorFactory from '../factory/user.validation.factory';
import IUser from './user.interface';
import { Post } from '@domain/post/entity/post';
import { randomUUID } from 'crypto';
import { PostFactory } from '@domain/post/factory/post.factory';

export class User extends RootEntity {
  private _username: string;
  private _email: string;
  private _age: number;
  private _nickname: string;
  private _following: number = 0;
  private _followers: number = 0;
  private _password: string;

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
  follow(user: User) {
    user.setFollow();
  }

  unfollow(user: User) {
    user.setUnfollow();
  }
  likePost(post: Post) {
    post.addLike(this.id);
  }

  removeLike(post: Post) {
    post.removeLike(this.id);
  }

  deslikePost(post: Post) {
    post.addDeslike(this.id);
  }

  removeDeslike(post: Post) {
    post.removeDeslike(this.id);
  }

  private setFollow() {
    this._followers += 1;
  }

  private setUnfollow() {
    this._followers -= 1;
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

  get following() {
    return this._following;
  }

  get followers() {
    return this._followers;
  }
}
