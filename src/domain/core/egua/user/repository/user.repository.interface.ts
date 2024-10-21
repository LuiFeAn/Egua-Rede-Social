import { Repository } from '@domain/@shared/repository/abstract.repository';
import { User } from '@domain/core/egua/user/entity/user';
export interface IUserRepository extends Repository<User> {
  emailExists(email: string): Promise<boolean>;
  nicknameExists(nickname: string): Promise<boolean>;
}
