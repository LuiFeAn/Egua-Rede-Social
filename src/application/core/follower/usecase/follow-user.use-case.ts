import { IFollowerRepository } from '@domain/core/follower/repository/follower.repository.interface';
import { FollowingRepository } from '@infra/core/following/repositories/following.repository';

export class FollowUserUseCase {
  constructor(
    private readonly followerRepo: IFollowerRepository,
    private readonly followingRepo: FollowingRepository,
  ) {}

  async execute(followerId: string, followingId: string) {
    const follower = await this.followerRepo.findById(followerId);

    const following = await this.followingRepo.findById(followingId);

    follower.follow(followingId);

    following.addFollower(followerId);

    await this.followerRepo.follow({
      followerId: follower.id,
      followingId: following.id,
    });
  }
}
