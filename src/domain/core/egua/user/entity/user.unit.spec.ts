import { randomUUID } from 'crypto';
import UserMapper from '../mapper/user.mapper';
import { User } from './user';
import { Post } from '../../post/entity/post';
import { Password } from './value_object/password/password';
describe('UserEntity unit tests', () => {
  it('Should create a user', () => {
    const input = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: new Password('Str0ngP@ssword12'),
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
      password: new Password('Str0ngP@ssword12'),
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
      password: new Password('Str0ngP@ssword12'),
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
      password: new Password('Str0ngP@ssword12'),
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
      password: new Password('Str0ngP@ssword12'),
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
      password: new Password('Str0ngP@ssword12'),
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
      password: new Password('Str0ngP@ssword12'),
      email: 'teste@email.com',
      age: 101,
      nickname: 'LuiFeAn',
    };

    expect(() => {
      new User(input);
    }).toThrow('UserInstance: The maximum age is 100 years');
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
      password: new Password('Str0ngP@ssword12'),
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
      password: new Password('Str0ngP@ssword12'),
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
      password: new Password('Str0ngP@ssword12'),
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
      password: new Password('Str0ngP@ssword12'),
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
});
