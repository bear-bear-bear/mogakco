import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
class LoginBadRequestException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.json({
      statusCode: 400,
      message: '아이디 또는 비밀번호가 잘못되었습니다.',
    });
  }
}

export default LoginBadRequestException;
