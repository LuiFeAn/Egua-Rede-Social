import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserModel } from './user';

@Entity('user_follow_link')
export class UserFollowLinkModel {
  @ManyToOne(() => UserModel)
  @JoinColumn({
    name: 'follower_id',
  })
  follower: UserModel;

  @ManyToOne(() => UserModel)
  @JoinColumn({
    name: 'following_id',
  })
  following: UserModel;
}
