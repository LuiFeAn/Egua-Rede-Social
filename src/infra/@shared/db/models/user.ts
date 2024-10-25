import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserFollowLinkModel } from './user-follow-link';
@Entity('user')
export class UserModel {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'int',
  })
  age: number;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'char',
    length: 6,
  })
  nickname: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
  })
  username: string;

  @Column({
    type: 'int',
  })
  followingCount: number;

  @Column({
    type: 'int',
  })
  followerCount: number;

  @OneToMany(
    () => UserFollowLinkModel,
    (userFollowLink) => userFollowLink.following,
  )
  followings: UserFollowLinkModel[];

  @OneToMany(
    () => UserFollowLinkModel,
    (userFollowLink) => userFollowLink.follower,
  )
  followers: UserFollowLinkModel[];
}
