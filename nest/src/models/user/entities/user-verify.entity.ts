import { Column, Entity } from 'typeorm';
import { BaseEntityOnlyCreatedAt } from '@common/helpers/entity.helper';

@Entity({
  name: 'users_verify',
})
class UserVerifyEntity extends BaseEntityOnlyCreatedAt {
  @Column({ length: 50 })
  public email!: string;

  @Column()
  public token!: string;

  @Column({ name: 'expired_at' })
  public expiredAt!: Date;

  @Column({ name: 'is_verified', default: false })
  public isVerified!: boolean;
}

export default UserVerifyEntity;
