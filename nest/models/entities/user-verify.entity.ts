import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['id'])
class UserVerifyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ length: 50 })
  public email!: string;

  @Column()
  public token!: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt!: Date;

  @Column({ name: 'expired_at' })
  public expiredAt!: Date;

  @Column({ name: 'is_verified', default: false })
  public isVerified!: boolean;
}

export default UserVerifyEntity;
