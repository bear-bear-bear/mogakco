import { EntityRepository, getManager, Repository } from 'typeorm';
import UserRolesEntity from '@src/models/user/entities/user-roles.entity';
import UserEntity from '@models/user/entities/user.entity';
import RolesEntity from '@models/user/entities/roles.entity';
import { BadGatewayException } from '@nestjs/common';

@EntityRepository(UserRolesEntity)
export default class UserRolesRepository extends Repository<UserRolesEntity> {
  async createUserRoleWithJoinUser(user: UserEntity) {
    const role = await getManager().findOne(RolesEntity, {
      where: {
        name: '일반 사용자',
      },
    });
    if (!role) throw new BadGatewayException('일반 사용자에 대한 역할 권한이 업습니다.');
    const userRole = this.create({
      user,
      role,
    });
    await userRole.save();
    return userRole;
  }
}
