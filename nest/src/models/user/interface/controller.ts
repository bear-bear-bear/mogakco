import { Request } from 'express';

export type AuthRequest = Request & { user: { id: number; username: string } };

export type UserSelectableProp = { id: number; name: string };

export interface GetSelectableProps {
  statusCode: number;
  message: string;
  list: UserSelectableProp[] | null;
}

export interface IUserController {
  getUserSelfInfo(req: AuthRequest): Promise<any>;

  getAllFields(): Promise<GetSelectableProps>;

  getAllJobs(): Promise<GetSelectableProps>;
}
