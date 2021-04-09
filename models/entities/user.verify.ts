import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import User from './user';

@Entity()
@Unique(['id'])
class UserVerify extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public token!: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt!: Date;

  @Column({ name: 'expired_at' })
  public expiredAt!: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public userId!: number;
}

export default UserVerify;
