import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import RoomEntity from './room.entity';
import UserEntity from './user.entity';
import { BaseEntityOnlyCreatedAt } from './helper/abstract';

@Entity({
  name: 'room_users',
})
export default class RoomUserEntity extends BaseEntityOnlyCreatedAt {
  @ManyToOne(() => RoomEntity, room => room.id)
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  roomId!: RoomEntity;

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId!: UserEntity;
}
