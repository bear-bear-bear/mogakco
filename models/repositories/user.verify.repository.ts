import UserVerify from 'models/entities/user.verify';
import { Repository, EntityRepository } from 'typeorm';

/**
 * 기존에 사용자 아이디가 있으면 새로 레코드를 만들지 않고 토큰을 업데이트
 * 나누는 단위는 |
 * verifyToken에 들어가는 id는 사용자 아이디
 * userId 외래키에 사용자 아이디가 들어가고 이메일 검증 토큰 id는 따로 생성됨.
 */
@EntityRepository(UserVerify)
class UserVerifyRepository extends Repository<UserVerify> {
  public async createOne(email: string, verifyToken: string) {
    const userVerify = new UserVerify();
    userVerify.token = verifyToken;
    userVerify.expiredAt = new Date(Date.now() + 1000 * 60 * 30);
    userVerify.email = email;
    await userVerify.save();
    return userVerify;
  }

  public async findOneByEmail(id: number, email: string) {
    const userVerify = await this.findOne({ id, email });
    if (!userVerify) throw new Error('');
    return userVerify;
  }
}

export default UserVerifyRepository;
