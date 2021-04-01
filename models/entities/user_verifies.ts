import { Entity } from 'typeorm';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm/browser';

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
}

export default UserVerifies;
