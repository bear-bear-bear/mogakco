import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from './user.entity';

@Entity({
  name: 'users-field',
})
class UserFieldEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ length: 20, nullable: false })
  public name!: string;

  @ManyToOne(() => UserEntity, user => user.fields)
  user!: UserEntity;
}

export default UserFieldEntity;
