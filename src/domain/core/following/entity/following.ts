import { User } from '../../user/entity/user';

export class Following extends User {
  private _followerCount: number = 0;
  private _followers: string[] = [];

  public addFollower(followerId: string): void {
    if (this.isFollower(followerId)) {
      throw new Error('This user is already a follower');
    }
    this._followers.push(followerId);
    this._followerCount += 1;
  }

  public removeFollower(followerId: string): void {
    if (!this.isFollower(followerId)) {
      throw new Error('This user is not a follower');
    }
    this._followers = this._followers.filter((id) => id !== followerId);
    this._followerCount -= 1;
  }

  public isFollower(followerId: string): boolean {
    return this._followers.includes(followerId);
  }

  get followerCount(): number {
    return this._followerCount;
  }

  get followers(): string[] {
    return this._followers;
  }
}
