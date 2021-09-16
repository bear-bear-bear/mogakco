import { Column, Entity } from 'typeorm';
import { BaseEntitySoftDelete } from '@common/helpers/entity.helper';

@Entity({
  name: 'roles',
})
export default class RolesEntity extends BaseEntitySoftDelete {
  @Column({ nullable: true, length: 255 })
  name!: string;
}
