import { Repository } from '@domain/@shared/repository/abstract.repository';
import { Follower } from '../entity/follower';

export interface IFollowerRepository extends Repository<Follower> {}
