import { User } from '../../user/entity/user';
export class Follower extends User {
  private _followingCount: number = 0;
  private _following: string[] = [];

  public follow(userId: string): void {
    if (this.isFollowing(userId)) {
      throw new Error('Already following this user');
    }
    this._following.push(userId);
    this._followingCount += 1;
  }

  public unfollow(userId: string): void {
    if (!this.isFollowing(userId)) {
      throw new Error('You are not following this user');
    }
    this._following = this._following.filter((id) => id !== userId);
    this._followingCount -= 1;
  }

  public isFollowing(userId: string): boolean {
    return this._following.includes(userId);
  }

  get followingCount(): number {
    return this._followingCount;
  }

  get following(): string[] {
    return this._following;
  }
}
