import decoratorHelper from '@common/helpers/decorator.helper';
import { SwaggerTag } from '@common/helpers/enum.helper';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
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
