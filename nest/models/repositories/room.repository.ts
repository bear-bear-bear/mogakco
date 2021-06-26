import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import UserRepository from './user.repository';
import RoomEntity from '../entities/room.entity';

@EntityRepository(RoomEntity)
export default class RoomRepository extends Repository<RoomEntity> {
  async createRoom(userId: number) {
    const owner = await getCustomRepository(UserRepository).findOne(userId);
    if (owner === undefined) return;

    const room = new RoomEntity();
    room.ownerId = owner;
    await room.save();
  }
}
