import { EntityRepository, Repository } from 'typeorm';
import ChatEntity from '@models/chat/entities/chat.entity';
import UserEntity from '@models/user/entities/user.entity';
import RoomEntity from '@models/chat/entities/room.entity';

@EntityRepository(ChatEntity)
export default class ChatRepository extends Repository<ChatEntity> {
  async createChat(user: UserEntity, room: RoomEntity, content: string) {
    const chat = this.create({
      user,
      room,
      content,
    });
    await chat.save();
    return chat;
  }
}
