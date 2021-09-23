import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityHardDelete } from '@common/helpers/entity.helper';
import UserEntity from '@models/user/entities/user.entity';

@Entity({
  name: 'anonymous_names',
})
export default class AnonymousNameEntity extends BaseEntityHardDelete {
  @Column({ nullable: false, length: 10, unique: true })
  name!: string;

  @ManyToOne(() => UserEntity, user => user.anonymousNames)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
