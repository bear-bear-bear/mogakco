import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntitySoftDelete } from '@common/helpers/entity.helper';
import UserRolesEntity from '@models/user/entities/user-roles.entity';

@Entity({
  name: 'roles',
})
export default class RolesEntity extends BaseEntitySoftDelete {
  @Column({ nullable: true, length: 255 })
  name!: string;

  @OneToMany(() => UserRolesEntity, userRole => userRole.role)
  userRole!: UserRolesEntity[];
}
