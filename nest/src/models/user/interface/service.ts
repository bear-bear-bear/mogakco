import { UserSelectableProp } from '@models/user/interface/controller';

export interface FindShallowUserRepository {
  id: number;
  username: string;
  email: string;
  skills: number[] | null;
  job: UserSelectableProp[] | null;
}

export interface ShallowUser {
  id: number;
  username: string;
  email: string;
  skills: UserSelectableProp[] | null;
  job: UserSelectableProp[] | null;
}

export interface IUserService {
  a: string;
}
