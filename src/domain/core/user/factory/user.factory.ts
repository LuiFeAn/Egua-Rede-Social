import { User } from '../entity/user';
import Nickname from '../entity/value_object/nickname/nickname';
import { Password } from '../entity/value_object/password/password';

interface ICreateUserInputProps {
  id: string;
  username: string;
  email: string;
  age: number;
  nickname: string;
  password: string;
}
export class UserFactory {
  public static create({
    id,
    nickname,
    age,
    email,
    password,
    username,
  }: ICreateUserInputProps) {
    return new User({
      id,
      username,
      nickname: new Nickname(nickname),
      age,
      email,
      password: new Password(password),
    });
  }
}
