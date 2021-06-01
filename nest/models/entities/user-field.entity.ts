import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntityHardDelete } from './helper/abstract';

@Entity({
  name: 'users_field',
})
class UserFieldEntity extends BaseEntityHardDelete {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ length: 20, nullable: false })
  public name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export default UserFieldEntity;
