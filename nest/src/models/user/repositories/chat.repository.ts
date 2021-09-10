import { EntityRepository, Repository } from 'typeorm';
import ChatEntity from '@models/chat/entities/chat.entity';

@EntityRepository(ChatEntity)
export default class ChatRepository extends Repository<ChatEntity> {}
