import { Follower } from '../entity/follower';

export interface IFollowInputProps {
  followerId: string;
  followingId: string;
}

export interface IFollowerRepository {
  findById(id: string): Promise<Follower>;
  follow(props: IFollowInputProps): Promise<void>;
}
