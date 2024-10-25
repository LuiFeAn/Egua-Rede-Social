import { randomUUID } from 'crypto';
import { Follower } from './follower';
import { Following } from '../../following/entity/following';
import { Password } from '../../user/entity/value_object/password/password';
import Nickname from '../../user/entity/value_object/nickname/nickname';
describe('FollowerEntity Unit Tests', () => {
  it('Should throw a error if user already follow a user', () => {
    const input1 = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const input2 = {
      id: randomUUID(),
      username: 'Uncle Bob',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const following = new Following(input2);

    const follower = new Follower(input1);

    follower.follow(following.id);

    expect(() => {
      follower.follow(following.id);
    }).toThrow('Already following this user');
  });

  it('Should follow a user', () => {
    const input1 = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const input2 = {
      id: randomUUID(),
      username: 'Uncle Bob',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const input3 = {
      id: randomUUID(),
      username: 'Uncle Bob',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const following1 = new Following(input2);
    const following2 = new Following(input3);

    const follower = new Follower(input1);

    follower.follow(following1.id);
    follower.follow(following2.id);

    expect(follower.followingCount).toBe(2);
    expect(follower.following).toEqual([following1.id, following2.id]);
  });

  it('Should unfollow a user', () => {
    const input1 = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const input2 = {
      id: randomUUID(),
      username: 'Uncle Bob',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const input3 = {
      id: randomUUID(),
      username: 'Uncle Bob',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const following1 = new Following(input2);
    const following2 = new Following(input3);

    const follower = new Follower(input1);

    follower.follow(following1.id);
    follower.follow(following2.id);

    expect(follower.followingCount).toBe(2);
    expect(follower.following).toEqual([following1.id, following2.id]);

    follower.unfollow(following1.id);

    expect(follower.followingCount).toBe(1);
    expect(follower.following).toEqual([following2.id]);

    follower.unfollow(following2.id);

    expect(follower.followingCount).toBe(0);
    expect(follower.following).toEqual([]);
  });
});
