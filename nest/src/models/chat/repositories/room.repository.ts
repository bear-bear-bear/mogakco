import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import UserRepository from '@models/user/repositories/user.repository';
import RoomEntity from '@models/chat/entities/room.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(RoomEntity)
export default class RoomRepository extends Repository<RoomEntity> {
  /**
   * @desc 채팅방 생성 ( userId 가 방장이 됨 )
   */
  async createRoom(userId: number) {
    const owner = await getCustomRepository(UserRepository).findOne(userId);
    if (owner === undefined) return;

    const room = new RoomEntity();
    room.ownerId = owner;
    await room.save();
  }

  /**
   * @desc 해당 번호에 해당하는 채팅방이 이용가능한 지 여부를 반환합니다.
   */
  async isAvailable(id: number): Promise<boolean> {
    try {
      const room = await this.findOne(id);
      return room !== undefined;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
