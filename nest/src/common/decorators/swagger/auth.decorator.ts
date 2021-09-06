import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerTag } from '@common/helpers/enum.helper';

type Decorator = MethodDecorator | (MethodDecorator & ClassDecorator);

function decoratorHelper(...decorators: Decorator[]) {
  return applyDecorators(ApiTags(SwaggerTag.AUTH), ...decorators);
}

export function LoginSwagger() {
  return decoratorHelper(
    ApiOperation({ summary: '로그인 API', description: '로그인을 수행합니다.' }),
    ApiResponse({ status: 200, description: '로그인 성공' }),
    ApiResponse({ status: 400, description: '잘못된 요청 폼' }),
    ApiResponse({ status: 404, description: '해당 정보의 유저가 존재하지 않음' }),
    ApiResponse({ status: 401, description: '비밀번호가 틀림' }),
  );
}

// TODO: Response Case 보충
export function LogoutSwagger() {
  return decoratorHelper(
    ApiOperation({
      summary: '로그아웃 API',
      description: '로그아웃을 수행합니다.',
    }),
    ApiResponse({ status: 200, description: '로그아웃 성공' }),
  );
}

export function AccessTokenSwagger() {
  return decoratorHelper(
    ApiOperation({
      summary: 'accessToken 갱신 API',
      description: 'accessToken 을 갱신하여 반환합니다. ( Refresh 정보 필요 )',
    }),
    ApiResponse({ status: 201, description: 'accessToken 갱신 완료' }),
  );
}

export function SignOutSwagger() {
  return decoratorHelper(
    ApiOperation({ summary: '회원가입 API', description: '회원가입을 수행합니다.' }),
    ApiResponse({ status: 201, description: '회원가입 성공' }),
    ApiResponse({ status: 400, description: '잘못된 요청 폼' }),
    ApiResponse({
      status: 409,
      description: '이미 존재하는 유저 정보를 사용',
    }),
    ApiResponse({ status: 401, description: '이메일 인증을 수행하지 않음' }),
  );
}

export function SendTokenSwagger() {
  return decoratorHelper(
    ApiOperation({
      summary: '이메일 전송 API',
      description:
        '입력 이메일 정보로 인증정보를 전송하고 이메일 전송 여부에 대한 객체를 반환합니다.',
    }),
    ApiResponse({ status: 200, description: '이메일 전송 성공' }),
    ApiResponse({ status: 400, description: '잘못된 요청 폼' }),
  );
}

// TODO: Query 정보 작성
export function BeforeRegisterSwagger() {
  return decoratorHelper(
    ApiOperation({
      summary: '이메일 인증 검증 및 리다이렉션 API',
      description: '이메일 인증 검증 여부와 함께 회원가입 페이지로 리다이렉션합니다',
    }),
    ApiResponse({ status: 307, description: '회원가입 페이지로 리다이렉션 됨' }),
  );
}

// TODO: Query 정보 작성
export function VerifyEmailSwagger() {
  return decoratorHelper(
    ApiOperation({
      summary: '이메일 검증 API',
      description:
        '입력받은 이메일 정보에 해당하는 사용자가 이메일 인증을 수행했는 지에 대한 여부를 반환한다.',
    }),
    ApiResponse({ status: 200, description: '이메일 인증을 수행한 유저' }),
    ApiResponse({ status: 401, description: '인증을 수행하지 않은 유저' }),
  );
}
