import { randomUUID } from 'crypto';
import { Following } from './following';
import { Password } from '../../user/entity/value_object/password/password';
import Nickname from '../../user/entity/value_object/nickname/nickname';
describe('FollowerEntity Unit Tests', () => {
  it('Should throw a error if user already a follower', () => {
    const input1 = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const followerUuid1 = randomUUID();

    const following = new Following(input1);

    following.addFollower(followerUuid1);

    expect(() => {
      following.addFollower(followerUuid1);
    }).toThrow('This user is already a follower');
  });

  it('Should add a new follower', () => {
    const input1 = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const followerUuid1 = randomUUID();
    const followerUuid2 = randomUUID();

    const following = new Following(input1);

    following.addFollower(followerUuid1);
    following.addFollower(followerUuid2);

    expect(following.followerCount).toBe(2);
    expect(following.followers).toEqual([followerUuid1, followerUuid2]);
  });

  it('Should remove a follower', () => {
    const input1 = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: new Password('Str0ngP@ssword12'),
      email: 'testexxx@email.com',
      age: 24,
      nickname: new Nickname('LuiFeAn'),
    };

    const followerUuid1 = randomUUID();
    const followerUuid2 = randomUUID();

    const following = new Following(input1);

    following.addFollower(followerUuid1);
    following.addFollower(followerUuid2);

    expect(following.followerCount).toBe(2);
    expect(following.followers).toEqual([followerUuid1, followerUuid2]);

    following.removeFollower(followerUuid1);

    expect(following.followerCount).toBe(1);
    expect(following.followers).toEqual([followerUuid2]);

    following.removeFollower(followerUuid2);

    expect(following.followerCount).toBe(0);
    expect(following.followers).toEqual([]);
  });
});
