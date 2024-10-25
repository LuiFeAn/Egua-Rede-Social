import { Follower } from '@domain/core/follower/entity/follower';
import {
  IFollowerRepository,
  IFollowInputProps,
} from '@domain/core/follower/repository/follower.repository.interface';
import { IUserRepository } from '@domain/core/user/repository/user.repository.interface';
import { UserFollowLinkModel } from '@infra/@shared/db/models/user-follow-link';
import { Repository } from 'typeorm';

export class FollowerRepository implements IFollowerRepository {
  constructor(
    private readonly repository: Repository<UserFollowLinkModel>,
    private readonly userRepo: IUserRepository,
  ) {}

  async findById(id: string): Promise<Follower> {
    const entity = await this.userRepo.findById(id);
    return new Follower({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      nickname: entity.nickname,
      password: entity.password,
      age: entity.age,
    });
  }

  async follow({ followerId, followingId }: IFollowInputProps): Promise<void> {
    await this.repository.insert({
      following: {
        id: followingId,
      },
      follower: {
        id: followerId,
      },
    });
  }
}
