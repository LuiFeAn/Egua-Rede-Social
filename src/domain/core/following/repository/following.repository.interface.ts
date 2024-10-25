import { Following } from '../entity/following';

export interface IFollowingRepository {
  findById(id: string): Promise<Following>;
}
