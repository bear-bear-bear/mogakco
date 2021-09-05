import { Repository, EntityRepository } from 'typeorm';
import UserVerifyEntity from '../entities/user-verify.entity';

@EntityRepository(UserVerifyEntity)
class UserVerifyRepository extends Repository<UserVerifyEntity> {
  /** @desc 인증정보 생성합니다. */
  async createOne(email: string, verifyToken: string) {
    const userVerify = new UserVerifyEntity();
    userVerify.token = verifyToken;
    userVerify.expiredAt = new Date(Date.now() + 1000 * 60 * 30);
    userVerify.email = email;
    await userVerify.save();
    return userVerify;
  }

  async findOneByEmail(id: number, email: string) {
    const userVerify = await this.findOne({ id, email });
    if (!userVerify) throw new Error('');
    return userVerify;
  }
}

export default UserVerifyRepository;
