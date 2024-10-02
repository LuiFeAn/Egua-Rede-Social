import { User } from '../entity/user';

export default class UserMapper {
  public static toOutput(user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      nickname: user.nickname,
      age: user.age,
    };
  }
}
