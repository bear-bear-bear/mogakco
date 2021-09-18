import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntitySoftDelete } from '@common/helpers/entity.helper';
import UserEntity from '@models/user/entities/user.entity';
import RolesEntity from '@models/user/entities/roles.entity';

@Entity({
  name: 'user_roles',
})
export default class UserRolesEntity extends BaseEntitySoftDelete {
  @OneToOne(() => UserEntity, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user!: UserEntity;

  @ManyToOne(() => RolesEntity, role => role.userRole, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  role!: UserRolesEntity;
}
