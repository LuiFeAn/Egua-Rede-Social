import { Password } from "./value_object/password/password";
export default interface IUser {
  id: string;
  username: string;
  email: string;
  age: number;
  nickname: string;
  password: Password;
}
