import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './users';

@Entity({ name: 'oauth_users' })
class OauthUser {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ nullable: false, length: 255 })
  token!: string;

  @Column({ nullable: true, length: 20 })
  resource?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => User, oAuthUser => oAuthUser.id)
  oauth?: OauthUser[];
}

export default OauthUser;
