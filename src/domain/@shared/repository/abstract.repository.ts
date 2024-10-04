import { IFindAllInputDto, IFindAllOutputDto } from './interfaces';
export abstract class Repository<T> {
  abstract create(entity: T): Promise<void>;
  abstract findOne(): Promise<T | undefined>;
  abstract findAll(options: IFindAllInputDto): Promise<IFindAllOutputDto<T>>;
  abstract delete(): Promise<void>;
  abstract update(): Promise<void>;
}
