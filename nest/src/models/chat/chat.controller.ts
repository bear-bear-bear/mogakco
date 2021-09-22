import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import ChatService from './chat.service';
import {
  AddAnonymousNameSwagger,
  AddAnonymousPrefixSwagger,
  ChatAvailableSwagger,
  GetRoomMembersSwagger,
  JoinChatRoomSwagger,
} from '@common/decorators/swagger/chat.decorator';
import RoomUserRepository from './repositories/room-user.repository';
import RoomRepository from './repositories/room.repository';
import { AvailableRoom, ChatRoomJoin, IChatController, MemberCount } from './interface/controller';
import JwtAuthGuard from '@common/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import UserService from '@models/user/user.service';
import UserEntity from '@models/user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthRequest } from '@models/user/interface/controller';
import { GeneralResponse } from '@common/interface/global';
import AnonymousPropDto from '@models/chat/dto/anonymous-prop.dto';
import AdminGuard from '@common/guards/admin.guard';

@Controller('chat')
export default class ChatController implements IChatController {
  private readonly logger = new Logger('ChatController');

  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
  ) {}

  /**
   * @desc 방을 찾거나, 생성합니다.
   */
  @JoinChatRoomSwagger()
  @UseGuards(JwtAuthGuard)
  @Get('/recommend/join')
  async join(
    @Req() req: Request & { user: UserEntity },
    @Res({ passthrough: true }) res: Response,
  ): Promise<ChatRoomJoin | Pick<ChatRoomJoin, 'message'>> {
    const userId = req.user.id;
    const roomItem = await this.chatService.getRecommendRoom(userId);

    if ('isCreated' in roomItem) {
      res.status(HttpStatus.CREATED);
      this.logger.log(`${roomItem.room.id} 방을 생성하였습니다.`);
      return {
        statusCode: HttpStatus.CREATED,
        roomId: roomItem.room.id,
        message: '채팅방이 생성되었습니다.',
      };
    }
    res.status(HttpStatus.OK);
    this.logger.log(`${roomItem.id} 방을 찾았습니다.`);
    return {
      statusCode: HttpStatus.OK,
      roomId: roomItem.id,
      message: '채팅방을 찾았습니다.',
    };
  }

  @Get('/download')
  @UseGuards(JwtAuthGuard)
  chatFileDownload(req: Request): any {
    console.log(req);
  }

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor(''))
  chatFileUpload(@UploadedFile() file: Express.Multer.File): Promise<any> {
    console.log(file);
    return Promise.resolve();
  }

  /**
   * @desc 채팅방 이용 가능 여부를 검사합니다.
   */
  @ChatAvailableSwagger()
  @Get('/:id/available')
  async isAvailableChatRoom(
    @Param('id', ParseIntPipe)
    roomId: number,
  ): Promise<AvailableRoom> {
    const available = await this.roomRepository.isAvailable(roomId);
    if (available) {
      return {
        message: '채팅방이 존재합니다',
        statusCode: 200,
      };
    }
    throw new BadRequestException('채팅방이 존재하지 않습니다.');
  }

  /**
   * @desc 채팅방 인원을 계산합니다.
   */
  @GetRoomMembersSwagger()
  @Get('/:id/members')
  async getMembers(@Param('id', ParseIntPipe) roomId: number): Promise<MemberCount> {
    const isAvailable = await this.roomRepository.isAvailable(roomId);
    if (!isAvailable) throw new BadRequestException('채팅방이 존재하지 않습니다.');
    const memberCount = await this.roomUserRepository.getRoomMembers(roomId);
    return {
      memberCount,
    };
  }

  /**
   * @desc 어드민의 권한으로 익명 사용자의 접두어를 추가합니다.
   */
  @AddAnonymousPrefixSwagger()
  @Post('/anonymous/prefix-name')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  async addAnonymousPrefixRuleByAdmin(
    @Req() { user: { id: adminId } }: AuthRequest,
    @Body() { name }: AnonymousPropDto,
  ): Promise<GeneralResponse> {
    await this.chatService.addAnonymousPrefixName(adminId, name);
    return {
      statusCode: HttpStatus.OK,
      message: '익명 사용자 접두어 추가를 성공하였습니다.',
    };
  }

  /**
   * @desc 어드민의 권한으로 익명 사용자의 이름을 추가합니다.
   */
  @AddAnonymousNameSwagger()
  @Post('/anonymous/name')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  async addAnonymousNameRuleByAdmin(
    { user: { id: adminId } }: AuthRequest,
    { name }: AnonymousPropDto,
  ): Promise<GeneralResponse> {
    await this.chatService.addAnonymousPrefixName(adminId, name);
    return {
      statusCode: HttpStatus.OK,
      message: '익명 사용자 이름 추가를 성공하였습니다.',
    };
  }
}
