import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OauthRepository from '../models/repositories/oauth.repository';
import OauthUserService from '../services/oauth-user.service';
import OauthUserController from '../controllers/oauth-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OauthRepository])],
  controllers: [OauthUserController],
  providers: [OauthUserService],
})
class OauthModule {}

export default OauthModule;
