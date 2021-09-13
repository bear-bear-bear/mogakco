import { EntityRepository, getManager, Repository } from 'typeorm';
import AnonymousRoomUserEntity from '@models/chat/entities/anonymous-room-user.entity';
import UserEntity from '@models/user/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import RoomEntity from '@models/chat/entities/room.entity';

@EntityRepository(AnonymousRoomUserEntity)
export default class AnonymousRoomUserRepository extends Repository<AnonymousRoomUserEntity> {
  /**
   * @desc 익명 이름을 찾거나 생성합니다.
   */
  async findOrCreate(userId: number, roomId: number): Promise<AnonymousRoomUserEntity> {
    const user = await getManager().findOne(UserEntity, { id: userId });
    if (!user) throw new BadRequestException('사용자가 존재하지 않습니다.');
    const room = await getManager().findOne(RoomEntity, { id: roomId });
    if (!room) throw new BadRequestException('채팅방이 존재하지 않습니다.');

    const prevAnonymousName = await this.findOne({
      where: { user },
    });
    if (!prevAnonymousName) {
      const newAnonymousName = this.create({
        user,
        room,
        username: this.createAnonymousName(),
      });
      await newAnonymousName.save();
      return newAnonymousName;
    }

    return prevAnonymousName;
  }

  /**
   * @desc 랜덤 닉네임을 생성합니다.
   */
  createAnonymousName(): string {
    // TODO: 해당 부분 DB 로 관리하게 끔 ( 어드민에서 추가 설정 ) 할 예정
    const prefix = ['총명한', '세상에서 가장 나다운', '코가 대단한'];
    const name = ['제이지', '루삥뽕', '어피치'];
    const cal = () => Math.floor(Math.random() * 3);
    return `${prefix[cal()]} ${name[cal()]}`;
  }

  /**
   * @desc 해당 유저를 삭제합니다.
   */
  async deleteName(username: string) {
    await this.softDelete({ username });
  }
}
