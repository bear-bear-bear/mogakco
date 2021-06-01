import { Column, Entity, OneToMany } from 'typeorm';
import UserEntity from './user.entity';
import { BaseEntityHardDelete } from './helper/abstract';

@Entity({
  name: 'users_job',
})
class UserJobEntity extends BaseEntityHardDelete {
  @Column({ length: 15, nullable: false })
  public name!: string;

  /* relation */
  @OneToMany(() => UserEntity, user => user.job)
  user!: UserEntity;
}

export default UserJobEntity;
