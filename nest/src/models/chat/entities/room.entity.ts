import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import UserEntity from '@models/user/entities/user.entity';
import { BaseEntitySoftDelete } from '@common/helpers/entity.helper';
import RoomUserEntity from './room-user.entity';
import AnonymousRoomUserEntity from '@models/chat/entities/anonymous-room-user.entity';

@Entity({
  name: 'rooms',
})
export default class RoomEntity extends BaseEntitySoftDelete {
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  ownerId!: UserEntity;

  @Column({ nullable: true, type: 'simple-array' })
  skills!: number[] | null;

  @OneToMany(() => RoomUserEntity, room => room.roomId, {
    cascade: true,
  })
  roomUser!: RoomUserEntity[];

  @OneToMany(() => AnonymousRoomUserEntity, anonymous => anonymous.room)
  anonymousUser!: AnonymousRoomUserEntity[];
}
