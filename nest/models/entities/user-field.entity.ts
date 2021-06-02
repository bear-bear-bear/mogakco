import { Column, Entity } from 'typeorm';
import { BaseEntityHardDelete } from './helper/abstract';

@Entity({
  name: 'users_field',
})
class UserFieldEntity extends BaseEntityHardDelete {
  @Column({ length: 20, nullable: false })
  public name!: string;
}

export default UserFieldEntity;
