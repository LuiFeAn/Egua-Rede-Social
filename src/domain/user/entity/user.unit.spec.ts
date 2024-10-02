import { randomUUID } from 'crypto';
import UserMapper from '../mapper/user.mapper';
import { User } from './user';
describe('UserEntity unit tests', () => {
  it('Should create a User', () => {
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
});
