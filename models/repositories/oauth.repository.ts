import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import OauthUser from '../entities/oauth_users';

@Injectable()
@EntityRepository(OauthUser)
class OauthRepository extends Repository<OauthUser> {
  findOauthUserById(id: number) {
    return this.findOne(id);
  }
}

export default OauthRepository;
