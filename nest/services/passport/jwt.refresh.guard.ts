import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class JwtAuthGuardWithRefresh extends AuthGuard('jwt-with-refresh') {}
export default JwtAuthGuardWithRefresh;
