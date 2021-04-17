import UserVerify from 'models/entities/user.verify';
import { Repository, EntityRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

/**
 * 기존에 사용자 아이디가 있으면 새로 레코드를 만들지 않고 토큰을 업데이트
 * 나누는 단위는 |
 * verifyToken에 들어가는 id는 사용자 아이디
 * userId 외래키에 사용자 아이디가 들어가고 이메일 검증 토큰 id는 따로 생성됨.
 */
@EntityRepository(UserVerify)
class UserVerifyRepository extends Repository<UserVerify> {
  public async createOne(email: string) {
    const rand = uuid();
    const verifyToken = `${email}|${rand}`;
    const hashed = await bcrypt.hash(verifyToken, 12);

    const flag = await this.findOne({ email });
    const userVerify = !flag ? new UserVerify() : flag;
    userVerify.token = hashed;
    userVerify.expiredAt = new Date(Date.now() + 1000 * 60 * 30);
    userVerify.email = email;
    await userVerify.save();
    return userVerify;
  }
}

export default UserVerifyRepository;
