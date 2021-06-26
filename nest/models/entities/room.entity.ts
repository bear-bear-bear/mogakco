import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import RoomUserEntity from './room-user.entity';
import UserEntity from './user.entity';
import { BaseEntitySoftDelete } from './helper/abstract';

@Entity({
  name: 'rooms',
})
class RoomEntity extends BaseEntitySoftDelete {
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  ownerId!: UserEntity;

  @OneToMany(() => RoomUserEntity, room => room.roomId)
  roomUser?: RoomUserEntity;
}

export default RoomEntity;
