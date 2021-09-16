import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntitySoftDelete } from '@common/helpers/entity.helper';
import UserEntity from '@models/user/entities/user.entity';
import RolesEntity from '@models/chat/entities/roles.entity';

@Entity({
  name: 'user_roles',
})
export default class UserRolesEntity extends BaseEntitySoftDelete {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user!: UserEntity;

  @OneToOne(() => RolesEntity)
  @JoinColumn()
  role!: UserRolesEntity;
}
