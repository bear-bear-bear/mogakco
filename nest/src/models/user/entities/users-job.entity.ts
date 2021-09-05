import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityHardDelete } from '@common/helpers/entity.helper';
import UserEntity from './user.entity';

@Entity({
  name: 'users_job',
})
class UserJobEntity extends BaseEntityHardDelete {
  @Column({ length: 15, nullable: false })
  public name!: string;

  /* relation */
  @OneToMany(() => UserEntity, user => user.job)
  user!: UserEntity[];
}

export default UserJobEntity;
