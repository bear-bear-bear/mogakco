import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export default class NoUserException extends HttpException {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;
    if (status === 401) message = '유저 인증 권한이 존재하지 않습니다.';
    else message = '서버에서 에러가 발생했습니다.';
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
