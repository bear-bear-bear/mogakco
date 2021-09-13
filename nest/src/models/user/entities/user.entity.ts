import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntitySoftDelete } from '@common/helpers/entity.helper';
import RoomUserEntity from '@models/chat/entities/room-user.entity';
import UserJobEntity from './users-job.entity';
import AnonymousRoomUserEntity from '@models/chat/entities/anonymous-room-user.entity';

@Entity({
  name: 'users',
})
class UserEntity extends BaseEntitySoftDelete {
  @Column({ nullable: false, length: 10 })
  username!: string;

  @Column({ nullable: false, length: 50 })
  email!: string;

  @Column({ nullable: false, length: 150 })
  password!: string;

  @Column({ nullable: true, type: 'simple-array' })
  skills!: number[] | null;

  @Column({ type: 'varchar', nullable: true, name: 'refresh_token' })
  @Exclude()
  hashedRefreshToken!: string | null;

  /* relation */
  @ManyToOne(() => UserJobEntity, job => job.user)
  @JoinColumn({ name: 'job_id', referencedColumnName: 'id' })
  job!: UserJobEntity | null;

  @OneToMany(() => RoomUserEntity, room => room.userId)
  RoomUser!: RoomUserEntity;

  @OneToMany(() => AnonymousRoomUserEntity, anonymous => anonymous.user)
  anonymousUser!: AnonymousRoomUserEntity[];
}

export default UserEntity;
