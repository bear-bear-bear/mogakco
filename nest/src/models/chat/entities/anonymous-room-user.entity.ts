import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntitySoftDelete } from '@common/helpers/entity.helper';
import UserEntity from '@models/user/entities/user.entity';
import RoomEntity from '@models/chat/entities/room.entity';

@Entity({
  name: 'anonymous_room_users',
})
export default class AnonymousRoomUserEntity extends BaseEntitySoftDelete {
  @Column({ nullable: false, length: 30 })
  username!: string;

  @ManyToOne(() => UserEntity, user => user.anonymousUser)
  user!: UserEntity;

  @ManyToOne(() => RoomEntity, room => room.anonymousUser)
  room!: RoomEntity;
}
