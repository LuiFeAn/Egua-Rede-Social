import { IUserRepository } from '@domain/core/egua/user/repository/user.repository.interface';
import ICreateUserInputDto from './dto/input.dto';
import RootUseCase from '@application/@shared/use-case/root.use-case';
import { UserFactory } from '@domain/core/egua/user/factory/user.factory';
import { ICreateUserOutputDto } from './dto/output.dto';
import UserMapper from '@domain/core/egua/user/mapper/user.mapper';
export default class CreateUserUseCase extends RootUseCase {
  constructor(private readonly userRepo: IUserRepository) {
    super();
  }
  async execute(dto: ICreateUserInputDto): Promise<ICreateUserOutputDto> {
    const promises = [
      this.userRepo.emailExists(dto.email),
      this.userRepo.nicknameExists(dto.nickname),
    ];

    const [email, nickname] = await Promise.all(promises);

    if (email) {
      this.notification.add({
        context: 'UserCreation',
        error: 'Email already exists',
      });
    }

    if (nickname) {
      this.notification.add({
        context: 'UserCreation',
        error: 'Nickname already exists',
      });
    }

    this.notification.issue();

    const user = UserFactory.create(dto);

    await this.userRepo.create(user);

    return UserMapper.toOutput(user);
  }
}
