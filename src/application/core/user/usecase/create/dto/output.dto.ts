import UserMapper from '@domain/core/user/mapper/user.mapper';

export interface ICreateUserOutputDto
  extends ReturnType<typeof UserMapper.toOutput> {}
