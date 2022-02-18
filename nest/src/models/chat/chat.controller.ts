import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import ChatService from './services/chat.service';
import {
  AddAnonymousNameSwagger,
  AddAnonymousPrefixSwagger,
  ChatAvailableSwagger,
  DeleteAnonymousNameSwagger,
  DeleteAnonymousPrefixSwagger,
  FindAllAnonymousNameSwagger,
  FindAllAnonymousPrefixSwagger,
  GetRoomMembersSwagger,
  JoinChatRoomSwagger,
  ModifyAnonymousNameSwagger,
  ModifyAnonymousPrefixSwagger,
} from '@common/decorators/swagger/chat.decorator';
import RoomUserRepository from './repositories/room-user.repository';
import RoomRepository from './repositories/room.repository';
import {
  AvailableRoom,
  ChatRoomJoin,
  DeleteAnonymousProp,
  FindAllAnonymousProp,
  IChatController,
  MemberCount,
  UpdateAnonymousProp,
} from './interface/controller';
import JwtAuthGuard from '@common/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import UserService from '@models/user/user.service';
import UserEntity from '@models/user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthRequest } from '@models/user/interface/controller';
import { GeneralResponse } from '@common/interface/global';
import AnonymousPropDto from '@models/chat/dto/anonymous-prop.dto';
import AdminGuard from '@common/guards/admin.guard';
import ChatAnonymousService from './services/anonymous.service';
import RoomService from '@models/chat/services/room.service';

@Controller('chat')
export default class ChatController implements IChatController {
  private readonly logger = new Logger('ChatController');

  constructor(
    private readonly chatService: ChatService,
    private readonly roomService: RoomService,
    private readonly anonymousService: ChatAnonymousService,
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
    const roomItem = await this.roomService.getRecommendRoom(userId);

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

  @UseGuards(JwtAuthGuard)
  @Get('/download')
  chatFileDownload(req: Request): any {
    console.log(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/upload')
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
  @UseGuards(AdminGuard)
  @Post('/anonymous/prefix-name')
  @HttpCode(HttpStatus.OK)
  async addAnonymousPrefixRuleByAdmin(
    @Req() { user: { id: adminId } }: AuthRequest,
    @Body() { name }: AnonymousPropDto,
  ): Promise<GeneralResponse> {
    await this.anonymousService.addAnonymousPrefixName(adminId, name);
    return {
      statusCode: HttpStatus.OK,
      message: '익명 사용자 접두어 추가를 성공하였습니다.',
    };
  }

  /**
   * @desc 어드민의 권한으로 익명 사용자의 접두어를 수정합니다.
   */
  @ModifyAnonymousPrefixSwagger()
  @UseGuards(AdminGuard)
  @Put('/anonymous/prefix-name/:id')
  async modifyAnonymousPrefixRuleByAdmin(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() { name }: AnonymousPropDto,
  ): Promise<UpdateAnonymousProp> {
    await this.anonymousService.modifyAnonymousPrefixName(id, name);
    return {
      statusCode: HttpStatus.OK,
      message: `${id} 번 데이터를 ${name} 으로 성공적으로 변경하였습니다.`,
      name,
      id,
    };
  }

  /**
   * @desc 어드민의 권한으로 익명 사용자의 접두어를 삭제합니다. ( hardDelete )
   */
  @DeleteAnonymousPrefixSwagger()
  @UseGuards(AdminGuard)
  @Delete('/anonymous/prefix-name/:id')
  async deleteAnonymousPrefixRuleByAdmin(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<DeleteAnonymousProp> {
    await this.anonymousService.deleteAnonymousPrefixName(id);
    return {
      statusCode: HttpStatus.OK,
      message: `${id} 번 데이터가 성공적으로 삭제되었습니다.`,
      id,
    };
  }

  /**
   * @desc 어드민의 권한으로 익명 사용자의 이름을 추가합니다.
   */
  @AddAnonymousNameSwagger()
  @UseGuards(AdminGuard)
  @Post('/anonymous/name')
  @HttpCode(HttpStatus.OK)
  async addAnonymousNameRuleByAdmin(
    { user: { id: adminId } }: AuthRequest,
    @Body() { name }: AnonymousPropDto,
  ): Promise<GeneralResponse> {
    await this.anonymousService.addAnonymousPrefixName(adminId, name);
    return {
      statusCode: HttpStatus.OK,
      message: '익명 사용자 이름 추가를 성공하였습니다.',
    };
  }

  /**
   * @desc 어드민의 권한으로 익명 사용자의 이름을 수정힙니다.
   */
  @ModifyAnonymousNameSwagger()
  @UseGuards(AdminGuard)
  @Put('/anonymous/name/:id')
  async modifyAnonymousPrefixNameByAdmin(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() { name }: AnonymousPropDto,
  ): Promise<UpdateAnonymousProp> {
    await this.anonymousService.modifyAnonymousName(id, name);
    return {
      statusCode: HttpStatus.OK,
      message: `${id} 번 데이터를 ${name} 으로 성공적으로 변경하였습니다.`,
      name,
      id,
    };
  }

  /**
   * @desc 어드민의 권한으로 익명 사용자의 이름을 삭제합니다. ( hardDelete )
   */
  @DeleteAnonymousNameSwagger()
  @UseGuards(AdminGuard)
  @Delete('/anonymous/name/:id')
  async deleteAnonymousNameRuleByAdmin(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<DeleteAnonymousProp> {
    await this.anonymousService.deleteAnonymousName(id);
    return {
      statusCode: HttpStatus.OK,
      message: `${id} 번 데이터가 성공적으로 삭제되었습니다.`,
      id,
    };
  }

  /**
   * @desc 어드민 권한으로 모든 익명 접두어 리스트를 불러옵니다.
   */
  // TODO: 페이지네이션 도입 필요성 있음
  @FindAllAnonymousPrefixSwagger()
  @UseGuards(AdminGuard)
  @Get('/anonymous/prefix-name')
  async findAllAnonymousPrefixRuleByAdmin(): Promise<FindAllAnonymousProp> {
    const list = await this.anonymousService.findAllAnonymousPrefix();
    return {
      statusCode: HttpStatus.OK,
      message: '익명 접두어 목록을 성공적으로 불러왔습니다.',
      list,
    };
  }

  /**
   * @desc 어드민 권한으로 모든 익명 이름 리스트를 불러옵니다.
   */
  // TODO: 페이지네이션 도입 필요성 있음
  @FindAllAnonymousNameSwagger()
  @UseGuards(AdminGuard)
  @Get('/anonymous/name')
  async findAllAnonymousNameRuleByAdmin(): Promise<FindAllAnonymousProp> {
    const list = await this.anonymousService.findAllAnonymousName();
    return {
      statusCode: HttpStatus.OK,
      message: '익명 이름 목록을 성공적으로 불러왔습니다.',
      list,
    };
  }
}
