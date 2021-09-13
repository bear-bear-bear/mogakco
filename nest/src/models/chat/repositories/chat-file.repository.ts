import { EntityRepository, Repository } from 'typeorm';
import ChatFileEntity from '@models/chat/entities/chat-file.entity';

@EntityRepository(ChatFileEntity)
export default class ChatFileRepository extends Repository<ChatFileEntity> {}
