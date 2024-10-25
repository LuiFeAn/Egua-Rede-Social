import { Following } from '@domain/core/following/entity/following';
import { IFollowingRepository } from '@domain/core/following/repository/following.repository.interface';
import { IUserRepository } from '@domain/core/user/repository/user.repository.interface';

export class FollowingRepository implements IFollowingRepository {
  constructor(private readonly userRepo: IUserRepository) {}

  async findById(id: string): Promise<Following> {
    const entity = await this.userRepo.findById(id);
    return new Following({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      nickname: entity.nickname,
      password: entity.password,
      age: entity.age,
    });
  }
}
