import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
declare class LoginBadRequestException implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
export default LoginBadRequestException;
