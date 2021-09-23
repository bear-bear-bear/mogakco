import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityHardDelete } from '@common/helpers/entity.helper';
import UserEntity from '@models/user/entities/user.entity';

@Entity({
  name: 'anonymous_prefix_names',
})
export default class AnonymousPrefixEntity extends BaseEntityHardDelete {
  @Column({ nullable: false, length: 10, unique: true })
  name!: string;

  @ManyToOne(() => UserEntity, user => user.anonymousUser)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
