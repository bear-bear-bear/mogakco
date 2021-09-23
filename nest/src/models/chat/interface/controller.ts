import { Request, Response } from 'express';
import { AuthRequest } from '@models/user/interface/controller';
import { GeneralResponse } from '@common/interface/global';
import AnonymousPropDto from '@models/chat/dto/anonymous-prop.dto';
import AnonymousPrefixEntity from '@models/chat/entities/anonymous_prefix.entity';

export interface AvailableRoom {
  message: string;
  statusCode: number;
}

export interface MemberCount {
  memberCount: number;
}

export interface ChatRoomJoin {
  statusCode: number;
  roomId: number;
  message: string;
}

export interface UpdateAnonymousProp extends GeneralResponse {
  id: number;
  name: string;
}

export interface DeleteAnonymousProp extends GeneralResponse {
  id: number;
}

export interface FindAllAnonymousProp extends GeneralResponse {
  list: AnonymousPrefixEntity[] | null;
}

export interface IChatController {
  isAvailableChatRoom(roomId: number): Promise<AvailableRoom>;

  getMembers(roomId: number): Promise<MemberCount>;

  join(req: Request, res: Response): Promise<ChatRoomJoin | Pick<ChatRoomJoin, 'message'>>;

  chatFileUpload(file: Express.Multer.File): Promise<any>;
  chatFileDownload(req: Request): any;

  addAnonymousPrefixRuleByAdmin(
    req: AuthRequest,
    prefixBody: AnonymousPropDto,
  ): Promise<GeneralResponse>;
  modifyAnonymousPrefixRuleByAdmin(
    id: number,
    body: AnonymousPropDto,
  ): Promise<UpdateAnonymousProp>;
  deleteAnonymousPrefixRuleByAdmin(id: number): Promise<DeleteAnonymousProp>;

  addAnonymousNameRuleByAdmin(
    req: AuthRequest,
    prefixBody: AnonymousPropDto,
  ): Promise<GeneralResponse>;
  modifyAnonymousPrefixNameByAdmin(
    id: number,
    body: AnonymousPropDto,
  ): Promise<UpdateAnonymousProp>;
  deleteAnonymousNameRuleByAdmin(id: number): Promise<DeleteAnonymousProp>;

  findAllAnonymousPrefixRuleByAdmin(): Promise<FindAllAnonymousProp>;
  findAllAnonymousNameRuleByAdmin(): Promise<FindAllAnonymousProp>;
}
