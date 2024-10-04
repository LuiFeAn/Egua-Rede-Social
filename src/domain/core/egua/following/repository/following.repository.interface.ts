import { Repository } from '@domain/@shared/repository/abstract.repository';
import { Following } from '../entity/following';

export interface IFollowingRepository extends Repository<Following> {}
