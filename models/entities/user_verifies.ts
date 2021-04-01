import { Entity } from 'typeorm';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm/browser';
import Users from './users';

@Entity({ name: 'user_verifies' })
class UserVerifies {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ nullable: false, length: 255 })
  token!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Column({ nullable: false, name: 'expired_at', length: 40 })
  expiredAt!: Date;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  userId!: Users;
}

export default UserVerifies;
