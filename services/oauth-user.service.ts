import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OauthRepository from '../models/repositories/oauth.repository';

@Injectable()
class OauthUserService {
  constructor(
    @InjectRepository(OauthRepository)
    private oauthRepository: OauthRepository,
  ) {}

  findOauthUserById(id: number) {
    return this.oauthRepository.findOauthUserById(id);
  }
}

export default OauthUserService;
