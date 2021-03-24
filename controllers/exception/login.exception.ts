import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
class LoginBadRequestException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    response.json({
      status: 400,
      message: '아이디 또는 비밀번호가 잘못되었습니다.',
      path: request.url,
    });
  }
}

export default LoginBadRequestException;
