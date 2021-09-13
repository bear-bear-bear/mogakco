import { Column, Entity } from 'typeorm';
import { BaseEntitySoftDelete } from '@common/helpers/entity.helper';

@Entity({
  name: 'chat_files',
})
export default class ChatFileEntity extends BaseEntitySoftDelete {
  @Column({ nullable: false, length: 255 })
  filename!: string;

  @Column({ nullable: false })
  size!: number;
}
