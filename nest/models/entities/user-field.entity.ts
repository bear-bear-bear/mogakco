import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users-field',
})
class UserFieldEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ length: 20, nullable: false })
  public name!: string;
}

export default UserFieldEntity;
