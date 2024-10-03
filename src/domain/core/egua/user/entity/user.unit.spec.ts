import { randomUUID } from 'crypto';
import UserMapper from '../mapper/user.mapper';
import { User } from './user';
import { Post } from '../../post/entity/post';
describe('UserEntity unit tests', () => {
  it('Should create a user', () => {
    const input = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const user = UserMapper.toOutput(new User(input));

    expect(input).toEqual(user);
    expect(user).toBeTruthy();
  });

  it('Should throw an error if id is invalid', () => {
    const input = {
      id: null,
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    expect(() => {
      new User(input);
    }).toThrow('UserInstance: ID is Required');
  });

  it('Should throw an error if username is invalid', () => {
    const input = {
      id: randomUUID(),
      username: null,
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    expect(() => {
      new User(input);
    }).toThrow('UserInstance: Username is Required');
  });

  it('Should throw an error if email is invalid', () => {
    const input = {
      id: randomUUID(),
      username: null,
      password: 'Str0ngP@ssword12',
      email: 'testexxxemail.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    expect(() => {
      new User(input);
    }).toThrow('UserInstance: The email must be valid');
  });

  it('Should throw an error if age is invalid', () => {
    const input = {
      id: randomUUID(),
      password: 'Str0ngP@ssword12',
      username: 'Luis Fernando',
      email: 'teste@email.com',
      age: null,
      nickname: 'LuiFeAn',
    };

    expect(() => {
      new User(input);
    }).toThrow(
      'UserInstance: The maximum age is 100 years,The minimum age is 18 years,The age must be an integer',
    );
  });

  it('Should throw an error if the minimum age is not 18 years', () => {
    const input = {
      id: randomUUID(),
      password: 'Str0ngP@ssword12',
      username: 'Luis Fernando',
      email: 'teste@email.com',
      age: 15,
      nickname: 'LuiFeAn',
    };

    expect(() => {
      new User(input);
    }).toThrow('UserInstance: The minimum age is 18 years');
  });

  it('Should throw an error if the age is more than 100 years', () => {
    const input = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 101,
      nickname: 'LuiFeAn',
    };

    expect(() => {
      new User(input);
    }).toThrow('UserInstance: The maximum age is 100 years');
  });

  it('Should throw an error if password is invalid', () => {
    const input = {
      id: randomUUID(),
      password: 'insecurePassword',
      username: 'Luis Fernando',
      email: 'teste@email.com',
      age: 101,
      nickname: 'LuiFeAn',
    };

    expect(() => {
      new User(input);
    }).toThrow(
      'UserInstance: The password must be 9 characteres, 1 number, 1 special character and 1 upperCase',
    );
  });

  it('Should add like in a post', () => {
    const post = new Post({
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Algum post interessante',
    });

    const input = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const user = new User(input);

    user.like(post);

    expect(post.likes).toBe(1);
  });

  it('Should remove a like from post', () => {
    const post = new Post({
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Algum post interessante',
    });

    const input = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const user = new User(input);

    user.like(post);

    expect(post.likes).toBe(1);

    user.removeLike(post);

    expect(post.likes).toBe(0);
  });

  it('Should add deslike in a post', () => {
    const post = new Post({
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Algum post interessante',
    });

    const input = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const user = new User(input);

    user.deslike(post);

    expect(post.deslikes).toBe(1);
  });

  it('Should remove a deslike from post', () => {
    const post = new Post({
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Algum post interessante',
    });

    const input = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const user = new User(input);

    user.deslike(post);

    expect(post.deslikes).toBe(1);

    user.removeDeslike(post);

    expect(post.deslikes).toBe(0);
  });

  it('Should throw a error if user follow yourself', () => {
    const uuid1 = randomUUID();

    const input1 = {
      id: uuid1,
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const user1 = new User(input1);

    expect(() => {
      user1.follow(user1);
    }).toThrow('You cant follow yourself');
  });
  it('Should follow a user', () => {
    const uuid1 = randomUUID();
    const uuid2 = randomUUID();
    const uuid3 = randomUUID();

    const input1 = {
      id: uuid1,
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const input2 = {
      id: uuid2,
      username: 'Erick Wendel',
      password: 'Str0ngP@ssword12',
      email: 'erickWendel@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const input3 = {
      id: uuid3,
      username: 'Uncle Bob',
      password: 'Str0ngP@ssword12',
      email: 'unclebob@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const user1 = new User(input1);
    const user2 = new User(input2);
    const user3 = new User(input3);

    user1.follow(user2);
    user3.follow(user2);

    expect(user1.usersFollowing).toHaveLength(1);
    expect(user3.usersFollowing).toHaveLength(1);

    expect(user2.followers).toBe(2);
    expect(user2.usersFollowers).toHaveLength(2);
    expect(user2.usersFollowers).toEqual([uuid1, uuid3]);
  });
  it('Should unfollow a user', () => {

    const uuid1 = randomUUID();
    const uuid2 = randomUUID();
    const uuid3 = randomUUID();
    
    const input1 = {
      id: uuid1,
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const input2 = {
      id: uuid2,
      username: 'Erick Wendel',
      password: 'Str0ngP@ssword12',
      email: 'erickWendel@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const input3 = {
      id: uuid3,
      username: 'Uncle Bob',
      password: 'Str0ngP@ssword12',
      email: 'unclebob@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };

    const user1 = new User(input1);
    const user2 = new User(input2);
    const user3 = new User(input3);

    user1.follow(user3);
    user2.follow(user3);

    expect(user1.usersFollowing).toHaveLength(1);
    expect(user2.usersFollowing).toHaveLength(1);

    expect(user3.usersFollowers).toHaveLength(2);
    expect(user3.followers).toBe(2);

    user1.unfollow(user3);

    expect(user1.usersFollowing).toHaveLength(0);

    expect(user3.usersFollowers).toHaveLength(1);
    expect(user3.followers).toBe(1);
  });
});
