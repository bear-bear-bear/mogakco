import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
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

  @Column({ nullable: false, type: 'simple-array' })
  skills!: number[] | null;

  @Column({ nullable: true, name: 'refresh_token' })
  @Exclude()
  hashedRefreshToken?: string;

  /* relation */
  @ManyToOne(() => UserJobEntity, job => job.user)
  @JoinColumn({ name: 'job_id' })
  job?: UserJobEntity | null;
}

export default UserEntity;
