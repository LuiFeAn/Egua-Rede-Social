import {
  IFindAllInputDto,
  IFindAllOutputDto,
} from '@domain/@shared/repository/interfaces';
import { User } from '@domain/core/egua/user/entity/user';
import { UserPersistence } from '../entities/user';
import { IUserRepository } from './../../../../domain/core/egua/user/repository/user.repository.interface';
import { Repository } from 'typeorm';
import { UserFactory } from '@domain/core/egua/user/factory/user.factory';

export class UserTestContainerRepository implements IUserRepository {
  constructor(private readonly repository: Repository<UserPersistence>) {}
  emailExists(email: string): Promise<boolean> {
    return this.repository.existsBy({
      email,
    });
  }
  nicknameExists(nickname: string): Promise<boolean> {
    return this.repository.existsBy({
      nickname,
    });
  }

  async create(entity: User): Promise<void> {
    await this.repository.save({
      id: entity.id,
      age: entity.age,
      email: entity.email,
      nickname: entity.nickname.value,
      password: entity.password.value,
      username: entity.username,
    });
  }
  async findOne(id: string): Promise<User> {
    const entity = await this.repository.findOneBy({
      id,
    });
    return UserFactory.create({
      id: entity.id,
      nickname: entity.nickname,
      age: entity.age,
      email: entity.email,
      password: entity.password,
      username: entity.username,
    });
  }
  async findAll(options: IFindAllInputDto): Promise<IFindAllOutputDto<User>> {
    console.log(options);
    return {
      meta: {
        currentPage: 0,
        totalItems: 0,
        totalItemsInPage: 0,
        totalPages: 0,
      },
      items: [],
    };
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async update(id: string): Promise<void> {
    console.log(id);
  }
}
