import { BadRequestException, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import ChatService from './chat.service';
import {
  ChatAvailableSwagger,
  GetRoomMembersSwagger,
} from '@common/decorators/swagger/chat.decorator';
import RoomUserRepository from './repositories/room-user.repository';
import RoomRepository from './repositories/room.repository';
import { AvailableRoom, IChatController, MemberCount } from './interface/controller';

@Controller('chat')
export default class ChatController implements IChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
  ) {}

  /**
   * @desc 채팅방 이용 가능 여부를 검사합니다.
   */
  @ChatAvailableSwagger()
  @Get('/available/:id')
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
}
