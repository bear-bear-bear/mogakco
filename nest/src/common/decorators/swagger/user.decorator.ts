import decoratorHelper from '@common/helpers/decorator.helper';
import { SwaggerTag } from '@common/helpers/enum.helper';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function GetAllFieldSwagger() {
  return decoratorHelper(
    SwaggerTag.USER,
    ApiOperation({
      summary: '모든 희망분야 불러오기 API',
      description: '서비스에 존재하는 모든 희망분야 객체 리스트를 가져옵니다.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '가져오기 성공',
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '불러오기 성공',
          list: [
            {
              id: 1,
              name: '전체주의',
            },
            {
              id: 2,
              name: '자본주의',
            },
          ],
        },
      },
    }),
  );
}

export function GetAllJobSwagger() {
  return decoratorHelper(
    SwaggerTag.USER,
    ApiOperation({
      summary: '모든 직업 불러오기 API',
      description: '서비스에 존재하는 모든 직업 객체 리스트를 가져옵니다.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '가져오기 성공',
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '불러오기 성공',
          list: [
            {
              id: 1,
              name: '대통령',
            },
            {
              id: 2,
              name: '총통',
            },
          ],
        },
      },
    }),
  );
}

export function UpdateUserSwagger() {
  return decoratorHelper(
    SwaggerTag.USER,
    ApiOperation({
      summary: '사용자 수정 API',
      description: '사용자 인증 요청에서 수정 데이터를 받아 유저 정보를 수정합니다.',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      description: '사용자 수정 성공',
      schema: {
        example: {
          statusCode: 200,
          message: '계정 정보가 성공적으로 수정되었습니다.',
          user: {
            id: 32,
            username: 'mogat',
            email: 'mogakco35@gmail.com',
            skills: [
              {
                id: 1,
                name: '안드로이드',
              },
              {
                id: 2,
                name: '백엔드',
              },
              {
                id: 3,
                name: '컴파일러',
              },
            ],
            job: {
              id: 1,
              name: '대학원생',
            },
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: '유저 권한이 없음',
      schema: {
        example: {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        },
      },
    }),
  );
}

export default function DeleteUserSwagger() {
  return decoratorHelper(
    SwaggerTag.USER,
    ApiOperation({
      summary: '유저 삭제 API',
      description: '유저 인증 정보를 받아 해당 유저 데이터를 삭제합니다.',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      description: '유저 삭제 성공',
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '계정이 성공적으로 삭제되었습니다.',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: '유저 권한이 없음',
      schema: {
        example: {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        },
      },
    }),
  );
}
