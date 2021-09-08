import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import UserEntity from '@models/user/entities/user.entity';
import { BaseEntitySoftDelete } from '@common/helpers/entity.helper';
import RoomUserEntity from './room-user.entity';

@Entity({
  name: 'rooms',
})
class RoomEntity extends BaseEntitySoftDelete {
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  ownerId!: UserEntity;

  @OneToMany(() => RoomUserEntity, room => room.roomId, {
    cascade: true,
  })
  roomUser?: RoomUserEntity[];
}

export default RoomEntity;
