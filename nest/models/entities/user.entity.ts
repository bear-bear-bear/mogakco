import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntitySoftDelete } from './helper/abstract';
import UserJobEntity from './users-job.entity';

@Entity({
  name: 'users',
})
class UserEntity extends BaseEntitySoftDelete {
  @Column({ nullable: false, length: 10 })
  username!: string;

  @Column({ nullable: false, length: 50 })
  email!: string;

  @Column({ nullable: false, length: 150 })
  password!: string;

  @Column({ nullable: true, type: 'simple-array' })
  skills!: number[] | null;

  @Column({ type: 'varchar', nullable: true, name: 'refresh_token' })
  @Exclude()
  hashedRefreshToken?: string | null;

  /* relation */
  @ManyToOne(() => UserJobEntity, job => job.user)
  @JoinColumn({ name: 'job_id', referencedColumnName: 'id' })
  job?: UserJobEntity | null;
}

export default UserEntity;
