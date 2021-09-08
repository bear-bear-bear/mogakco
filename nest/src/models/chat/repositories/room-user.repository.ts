import { EntityRepository, Repository } from 'typeorm';
import RoomUserEntity from '@models/chat/entities/room-user.entity';

@EntityRepository(RoomUserEntity)
export default class RoomUserRepository extends Repository<RoomUserEntity> {}
