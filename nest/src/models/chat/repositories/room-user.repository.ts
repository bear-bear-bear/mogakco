import { EntityRepository, Repository } from 'typeorm';
import RoomUserEntity from '@models/chat/entities/room-user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import UserEntity from '@models/user/entities/user.entity';
import RoomEntity from '@models/chat/entities/room.entity';

@EntityRepository(RoomUserEntity)
export default class RoomUserRepository extends Repository<RoomUserEntity> {
  /**
   * @param roomId 를 받아서 해당 방 유저 수를 구합니다.
   */
  async getRoomMembers(roomId: number) {
    try {
      const [, count] = await this.findAndCount({
        where: { roomId },
      });
      return count;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * @desc 해당 유저를 해당 룸에서 퇴장 처리합니다.
   */
  async leave(user: UserEntity, room: RoomEntity) {
    try {
      await this.delete({
        roomId: room,
        userId: user,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * @desc 해당 유저가 속한 채팅방 번호를 찾습니다.
   */
  async findBelongToRoomByUserId(user: UserEntity) {
    if (!user) throw new InternalServerErrorException();
    const roomUser = await this.findOne({
      where: { userId: user?.id },
      relations: ['roomId'],
    });
    if (!roomUser) throw new InternalServerErrorException();
    return roomUser.roomId;
  }

  getMemberCount(roomId: number) {
    this.count({
      where: { roomId },
    });
  }
}
