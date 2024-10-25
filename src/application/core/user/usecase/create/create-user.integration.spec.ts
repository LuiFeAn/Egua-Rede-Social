import { randomUUID } from 'crypto';
import CreateUserUseCase from './create-user.use-case';
import { DataSource } from 'typeorm';
import mysqlTestContainer from '@infra/@shared/db/mysql/test-container';
import { UserModel } from '@infra/@shared/db/models/user';
import { UserRepository } from '@infra/core/user/repositories/user.repository';

describe('CreateUserUseCase integration Tests', () => {
  let userRepo: UserRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    const db = await mysqlTestContainer();
    dataSource = new DataSource({
      type: 'mysql',
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      entities: [UserModel],
      synchronize: true,
    });
    await dataSource.initialize();
    userRepo = new UserRepository(dataSource.getRepository(UserModel));
  }, 30000);

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('Should throw an error if email already exists', async () => {
    const dto = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeA',
    };

    const createUserUseCase = new CreateUserUseCase(userRepo);

    await createUserUseCase.execute(dto);

    await expect(createUserUseCase.execute(dto)).rejects.toThrow(
      'UserCreation: Email already exists',
    );
  });

  it('Should throw an error if nickname already exists', async () => {
    const dto = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeA',
    };
    const createUserUseCase = new CreateUserUseCase(userRepo);

    await expect(createUserUseCase.execute(dto)).rejects.toThrow(
      'UserCreation: Nickname already exists',
    );
  });

  it('Should create a new User', async () => {
    const dto = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste1@email.com',
      age: 24,
      nickname: 'LuiFe2',
    };
    const createUserUseCase = new CreateUserUseCase(userRepo);

    await expect(createUserUseCase.execute(dto)).resolves.not.toThrow();
  });
});
