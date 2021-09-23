import { EntityRepository, getManager, getRepository, Repository } from 'typeorm';
import AnonymousRoomUserEntity from '@models/chat/entities/anonymous-room-user.entity';
import UserEntity from '@models/user/entities/user.entity';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import RoomEntity from '@models/chat/entities/room.entity';
import AnonymousPrefixEntity from '@models/chat/entities/anonymous_prefix.entity';
import AnonymousNameEntity from '@models/chat/entities/anonymous_names.entity';

@EntityRepository(AnonymousRoomUserEntity)
export default class AnonymousRoomUserRepository extends Repository<AnonymousRoomUserEntity> {
  /**
   * @desc 익명 이름을 찾거나 생성합니다.
   */
  async findOrCreate(
    userId: number,
    roomId: number,
  ): Promise<{ anonymousUser: AnonymousRoomUserEntity; isCreated: boolean }> {
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
        username: await this.createAnonymousName(),
      });
      await newAnonymousName.save();
      return {
        anonymousUser: newAnonymousName,
        isCreated: true,
      };
    }

    return {
      anonymousUser: prevAnonymousName,
      isCreated: false,
    };
  }

  /**
   * @desc 랜덤 닉네임을 생성합니다.
   */
  async createAnonymousName(): Promise<string> {
    // TODO: 해당 부분 DB 로 관리하게 끔 ( 어드민에서 추가 설정 ) 할 예정
    const prefixQueryResult = await getRepository(AnonymousPrefixEntity)
      .createQueryBuilder('prefix')
      .orderBy('RAND()')
      .getOne();
    if (!prefixQueryResult)
      throw new InternalServerErrorException('anonymousPrefix 쿼리 결과를 불러올 수 없습니다.');
    const { name: prefix } = prefixQueryResult;
    const nameQueryResult = await getRepository(AnonymousNameEntity)
      .createQueryBuilder('name')
      .orderBy('RAND()')
      .getOne();
    if (!nameQueryResult)
      throw new InternalServerErrorException('anonymousName 쿼리 결과를 불러올 수 없습니다.');
    const { name } = nameQueryResult;
    return `${prefix} ${name}`;
  }

  /**
   * @desc 해당 유저를 삭제합니다.
   */
  async deleteName(username: string) {
    await this.softDelete({ username });
  }
}
