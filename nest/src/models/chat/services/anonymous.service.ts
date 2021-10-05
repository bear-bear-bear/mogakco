import { Injectable } from '@nestjs/common';
import UserRepository from '@src/models/user/repositories/user.repository';
import { getRepository } from 'typeorm';
import AnonymousNameEntity from '../entities/anonymous_names.entity';
import AnonymousPrefixEntity from '../entities/anonymous_prefix.entity';
import {
  FindOrCreateAnonymousInfo,
  HandShakeAuth,
  IChatAnonymousService,
} from '@models/chat/interface/service';
import ChatService from '@models/chat/services/chat.service';
import AnonymousRoomUserRepository from '@models/chat/repositories/anonymous-room-user.repository';

/**
 * @desc 익명 이름에 관한 서비스
 */
@Injectable()
export default class ChatAnonymousService implements IChatAnonymousService {
  constructor(
    private readonly chatService: ChatService,
    private readonly userRepository: UserRepository,
    private readonly anonymousRoomUserRepository: AnonymousRoomUserRepository,
  ) {}

  async addAnonymousPrefixName(adminId: number, name: string): Promise<void> {
    const admin = await this.userRepository.findOne({ id: adminId });
    await getRepository(AnonymousPrefixEntity)
      .create({
        name,
        user: admin,
      })
      .save();
  }

  async modifyAnonymousPrefixName(id: number, name: string): Promise<void> {
    await getRepository(AnonymousPrefixEntity).update(
      { id },
      {
        name,
      },
    );
  }

  async deleteAnonymousPrefixName(id: number): Promise<void> {
    await getRepository(AnonymousPrefixEntity).delete({ id });
  }

  /**
   * @desc 익명 사용자 이름을 추가합니다.
   */
  async addAnonymousName(adminId: number, name: string): Promise<void> {
    const admin = await this.userRepository.findOne({ id: adminId });
    await getRepository(AnonymousNameEntity)
      .create({
        name,
        user: admin,
      })
      .save();
  }

  async modifyAnonymousName(id: number, name: string): Promise<void> {
    await getRepository(AnonymousNameEntity).update({ id }, { name });
  }

  async deleteAnonymousName(id: number): Promise<void> {
    await getRepository(AnonymousNameEntity).delete({ id });
  }

  async findAllAnonymousName(): Promise<AnonymousNameEntity[] | null> {
    const list = await getRepository(AnonymousNameEntity).find();
    if (!list) return null;
    return list;
  }

  async findAllAnonymousPrefix(): Promise<AnonymousPrefixEntity[] | null> {
    const list = await getRepository(AnonymousPrefixEntity).find();
    if (!list) return null;
    return list;
  }

  /**
   * @desc 익명 이름을 생성하여 반환합니다.
   */
  async findOrCreateAnonymousName(auth: HandShakeAuth): Promise<FindOrCreateAnonymousInfo> {
    const { userId, roomId } = this.chatService.getInfoFromHeader(auth);
    return this.anonymousRoomUserRepository.findOrCreate(userId, roomId);
  }
}
