import { Column, Entity } from 'typeorm';
import { BaseEntityHardDelete } from '@common/helpers/entity.helper';

@Entity({
  name: 'users_fields',
})
class UserFieldEntity extends BaseEntityHardDelete {
  @Column({ length: 20, nullable: false })
  public name!: string;
}

export default UserFieldEntity;
