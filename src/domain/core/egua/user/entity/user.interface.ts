import Nickname from "./value_object/nickname/nickname";
import { Password } from "./value_object/password/password";
export default interface IUser {
  id: string;
  username: string;
  email: string;
  age: number;
  nickname: Nickname;
  password: Password;
}
