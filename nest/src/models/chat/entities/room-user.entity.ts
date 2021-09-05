import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import UserEntity from '@models/user/entities/user.entity';
import { BaseEntityOnlyCreatedAt } from '@common/helpers/entity.helper';
import RoomEntity from './room.entity';

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
