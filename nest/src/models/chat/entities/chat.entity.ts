import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import UserEntity from '@models/user/entities/user.entity';
import { BaseEntitySoftDelete } from '@common/helpers/entity.helper';
import RoomEntity from './room.entity';

@Entity({
  name: 'room_chats',
})
export default class ChatEntity extends BaseEntitySoftDelete {
  @Column({
    nullable: false,
    length: 255,
  })
  content!: string;

  @ManyToOne(() => RoomEntity, room => room.id)
  @JoinColumn({ name: 'room_id' })
  room!: RoomEntity;

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
