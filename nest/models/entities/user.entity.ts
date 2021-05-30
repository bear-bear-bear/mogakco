import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import UserFieldEntity from '@models/entities/user-field.entity';

@Entity({
  name: 'users',
})
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ nullable: false, length: 10 })
  username!: string;

  @Column({ nullable: false, length: 50 })
  email!: string;

  @Column({ nullable: false, length: 150 })
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @Column({ nullable: true, name: 'refresh_token' })
  @Exclude()
  hashedRefreshToken?: string;

  @ManyToMany(() => UserFieldEntity)
  @JoinTable({ name: 'users_and_fields' })
  fields!: UserFieldEntity[];
}

export default UserEntity;
