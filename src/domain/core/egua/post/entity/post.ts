import RootEntity from '@domain/@shared/entity/root-entity';
import IPost from './post.interface';
import { PostValidatorFactory } from '../factory/post.validator.factory';
export class Post extends RootEntity {
  private _createdById: string;
  private _content: string;
  private _likes: number = 0;
  private _deslikes: number = 0;
  private _likedUserIds: string[] = [];
  private _deslikedUserIds: string[] = [];

  constructor({ id, userId, content }: IPost) {
    super(id);
    this._createdById = userId;
    this._content = content;
    this.validate();
  }

  validate(): void {
    PostValidatorFactory.create().validate(this);
  }

  addLike(userId: string) {
    if (this._likedUserIds.find((id) => id === userId)) {
      this.removeLike(userId);
      return;
    }
    this._likes += 1;
    this._likedUserIds.push(userId);
  }

  removeLike(userId: string) {
    this._likedUserIds = this._likedUserIds.filter((id) => id != userId);
    this._likes -= 1;
  }

  addDeslike(userId: string) {
    if (this._deslikedUserIds.find((id) => id === userId)) {
      this.removeDeslike(userId);
      return;
    }
    this._deslikes += 1;
    this._deslikedUserIds.push(userId);
  }

  removeDeslike(userId: string) {
    this._deslikedUserIds = this._deslikedUserIds.filter((id) => id != userId);
    this._deslikes -= 1;
  }

  get likedUserIds() {
    return this._likedUserIds;
  }

  get deslikedUserIds() {
    return this._deslikedUserIds;
  }

  get userId() {
    return this._createdById;
  }

  get content() {
    return this._content;
  }

  get likes() {
    return this._likes;
  }

  get deslikes() {
    return this._deslikes;
  }
}
