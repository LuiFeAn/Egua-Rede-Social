import { randomUUID } from 'crypto';
import CreateUserUseCase from './create-user.use-case';

const userRepo = {
  create: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  emailExists: jest.fn(),
  nicknameExists: jest.fn(),
  addFollower: jest.fn(),
  removeFollower: jest.fn(),
  addFollowing: jest.fn(),
  removeFollowing: jest.fn(),
};

describe('CreateUserUseCase Unit Tests', () => {
  it('Should throw an error if email already exists', async () => {
    userRepo.emailExists.mockResolvedValue(true);
    const dto = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };
    const createUserUseCase = new CreateUserUseCase(userRepo);

    await expect(createUserUseCase.execute(dto)).rejects.toThrow(
      'UserCreation: Email already exists',
    );
  });

  it('Should throw an error if nickname already exists', async () => {
    userRepo.emailExists.mockResolvedValue(false);
    userRepo.nicknameExists.mockResolvedValue(true);
    const dto = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };
    const createUserUseCase = new CreateUserUseCase(userRepo);

    await expect(createUserUseCase.execute(dto)).rejects.toThrow(
      'UserCreation: Nickname already exists',
    );
  });

  it('Should create a new User', async () => {
    userRepo.emailExists.mockResolvedValue(false);
    userRepo.nicknameExists.mockResolvedValue(false);
    const dto = {
      id: randomUUID(),
      username: 'Luis Fernando',
      password: 'Str0ngP@ssword12',
      email: 'teste@email.com',
      age: 24,
      nickname: 'LuiFeAn',
    };
    const createUserUseCase = new CreateUserUseCase(userRepo);

    await expect(createUserUseCase.execute(dto)).resolves.not.toThrow();
  });
});
