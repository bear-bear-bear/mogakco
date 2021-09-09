import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SwaggerTag } from '@common/helpers/enum.helper';
import decoratorHelper from '@common/helpers/decorator.helper';

export function LoginSwagger() {
  return decoratorHelper(
    SwaggerTag.AUTH,
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
    SwaggerTag.AUTH,
    ApiOperation({
      summary: '로그아웃 API',
      description: '로그아웃을 수행합니다.',
    }),
    ApiResponse({ status: 200, description: '로그아웃 성공' }),
    ApiResponse({ status: 401, description: 'refreshToken 정보 없음' }),
  );
}

export function AccessTokenSwagger() {
  return decoratorHelper(
    SwaggerTag.AUTH,
    ApiOperation({
      summary: 'accessToken 갱신 API',
      description: 'accessToken 을 갱신하여 반환합니다. ( Refresh 정보 필요 )',
    }),
    ApiResponse({ status: 201, description: 'accessToken 갱신 완료' }),
    ApiResponse({ status: 401, description: 'refreshToken 정보가 없음' }),
  );
}

export function SignSwagger() {
  return decoratorHelper(
    SwaggerTag.AUTH,
    ApiBearerAuth(),
    ApiOperation({ summary: '회원가입 API', description: '회원가입을 수행합니다.' }),
    ApiResponse({
      status: 201,
      description: '회원가입 성공',
      schema: {
        example: {
          statusCode: 200,
          message: '회원가입에 성공하였습니다.',
          accessToken: 'acecssToken',
          expiration: 'Date',
          user: {
            id: 1,
            username: 'username',
            email: 'email',
            job: {
              id: 1,
              name: '직업',
              createdAt: 'Date',
              updatedAt: 'Date',
            },
            skills: [
              {
                id: 1,
                name: '주술사',
                createdAt: 'Date',
                updatedAt: 'Date',
              },
              {
                id: 2,
                name: '성기사',
                createdAt: 'Date',
                updatedAt: 'Date',
              },
            ],
          },
        },
      },
    }),
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
    SwaggerTag.AUTH,
    ApiOperation({
      summary: '이메일 전송 API',
      description:
        '입력 이메일 정보로 인증정보를 전송하고 이메일 전송 여부에 대한 객체를 반환합니다.',
    }),
    ApiResponse({ status: 200, description: '이메일 전송 성공' }),
    ApiResponse({ status: 400, description: '잘못된 요청 폼' }),
  );
}

export function BeforeRegisterSwagger() {
  return decoratorHelper(
    SwaggerTag.AUTH,
    ApiOperation({
      summary: '이메일 인증 검증 및 리다이렉션 API',
      description: '이메일 인증 검증 여부와 함께 회원가입 페이지로 리다이렉션합니다',
    }),
    ApiQuery({
      name: 'id',
      description: '해당 유저 인증 정보의 id',
    }),
    ApiQuery({
      name: 'email',
      description: '인증 유저의 이메일',
    }),
    ApiResponse({ status: 307, description: '회원가입 페이지로 리다이렉션 됨' }),
  );
}

export function VerifyEmailSwagger() {
  return decoratorHelper(
    SwaggerTag.AUTH,
    ApiOperation({
      summary: '이메일 검증 API',
      description:
        '입력받은 이메일 정보에 해당하는 사용자가 이메일 인증을 수행했는 지에 대한 여부를 반환한다.',
    }),
    ApiQuery({
      name: 'email',
      description: '검증받을 유저의 이메일 정보',
    }),
    ApiResponse({ status: 200, description: '이메일 인증을 수행한 유저' }),
    ApiResponse({ status: 401, description: '인증을 수행하지 않은 유저' }),
  );
}

export function GetAuthenticationSwagger() {
  return decoratorHelper(
    SwaggerTag.AUTH,
    ApiOperation({
      summary: '인증정보 API',
      description:
        'Bearer Access Token 기반으로 로그인 유효한 사용자인 지 여부와 유저 객체를 반환합니다.',
    }),
    ApiBearerAuth(),
    ApiResponse({ status: 200, description: '인증 성공 여부와 유저 객체 반환' }),
    ApiResponse({ status: 401, description: '인증 실패 여부 반환' }),
  );
}
