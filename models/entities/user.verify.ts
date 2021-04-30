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
class UserVerify extends BaseEntity {
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

  // @OneToOne(() => User)
  // @JoinColumn({ name: 'user_id' })
  // public userId!: number;
}

export default UserVerify;
