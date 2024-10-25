import { IFindAllInputDto, IFindAllOutputDto } from './interfaces';
export abstract class Repository<T> {
  abstract create(entity: T): Promise<void>;
  abstract findById(id: string): Promise<T | undefined>;
  abstract findAll(options: IFindAllInputDto): Promise<IFindAllOutputDto<T>>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string): Promise<void>;
}
