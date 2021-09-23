import { Request, Response } from 'express';
import { AuthRequest } from '@models/user/interface/controller';
import { GeneralResponse } from '@common/interface/global';
import AnonymousPropDto from '@models/chat/dto/anonymous-prop.dto';

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

  addAnonymousNameRuleByAdmin(
    req: AuthRequest,
    prefixBody: AnonymousPropDto,
  ): Promise<GeneralResponse>;
}
