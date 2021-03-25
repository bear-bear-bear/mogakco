import { Controller } from '@nestjs/common';
import OauthUserService from '../services/oauth-user.service';

@Controller('oauth')
class OauthUserController {
  constructor(private oauthService: OauthUserService) {}

  async findOauthUserById(id: number) {
    const user = await this.oauthService.findOauthUserById(id);
    return user;
  }
}

export default OauthUserController;
