import { Request, Response } from 'express';
import UpdateUserDto from '@authentication/dto/update-user.dto';
import { ShallowUser } from '@models/user/interface/service';
import { GeneralResponse } from '@common/interface/global';

export interface UpdateUser {
  statusCode: number;
  message: string;
  user?: ShallowUser;
  error?: string;
}

export type AuthRequest = Request & { user: { id: number; username: string } };

export type UserSelectableProp = { id: number; name: string };

export interface GetSelectableProps extends GeneralResponse {
  list: UserSelectableProp[] | null;
}

export interface IUserController {
  getAllFields(): Promise<GetSelectableProps>;

  getAllJobs(): Promise<GetSelectableProps>;

  changeUserInfoFromMyPage(req: AuthRequest, updateUserDto: UpdateUserDto): Promise<UpdateUser>;

  deleteUserFromMyPage(req: AuthRequest, res: Response): Promise<GeneralResponse>;
}
