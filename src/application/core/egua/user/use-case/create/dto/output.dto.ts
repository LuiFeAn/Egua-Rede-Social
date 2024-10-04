import UserMapper from '@domain/core/egua/user/mapper/user.mapper';

export interface ICreateUserOutputDto
  extends ReturnType<typeof UserMapper.toOutput> {}
