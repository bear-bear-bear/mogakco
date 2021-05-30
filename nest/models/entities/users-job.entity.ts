import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users-job',
})
class UserJobEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ length: 15, nullable: false })
  public name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export default UserJobEntity;
