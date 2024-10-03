import RootEntity from '@domain/@shared/entity/root-entity';
import UserValidatorFactory from '../factory/user.validation.factory';
import IUser from './user.interface';
import { Post } from '../../post/entity/post';
import { PostFactory } from '../../post/factory/post.factory';
export class User extends RootEntity {
  private _username: string;
  private _email: string;
  private _age: number;
  private _nickname: string;
  private _following: number = 0;
  private _followers: number = 0;
  private _password: string;
  private _usersFollowing: string[] = [];
  private _usersFollowers: string[] = [];

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
    if (this.id === user.id) {
      throw new Error('You cant follow yourself');
    }
    user.setFollow();
    user.addFollower(this.id);
    this.addFollowing(user.id);
  }

  unfollow(user: User) {
    user.setUnfollow();
    user.removeFollower(this.id);
    this.removeFollowing(user.id);
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

  private setFollow() {
    this._followers += 1;
  }

  private setUnfollow() {
    this._followers -= 1;
  }

  private addFollower(userId: string) {
    if (this._usersFollowers.find((id) => id === userId)) {
      return;
    }
    this._usersFollowers.push(userId);
  }

  private addFollowing(userId: string) {
    if (this._usersFollowing.find((id) => id === userId)) {
      return;
    }
    this._usersFollowing.push(userId);
  }

  private removeFollowing(userId: string) {
    this._usersFollowing = this._usersFollowers.filter((id) => id != userId);
  }

  private removeFollower(userId: string) {
    this._usersFollowers = this._usersFollowers.filter((id) => id != userId);
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

  get usersFollowing() {
    return this._usersFollowing;
  }

  get usersFollowers() {
    return this._usersFollowers;
  }
}
