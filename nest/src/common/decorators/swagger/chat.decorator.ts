import decoratorHelper from '@common/helpers/decorator.helper';
import { SwaggerTag } from '@common/helpers/enum.helper';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';

function errorResHelper() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: '요청 양식이 잘못 됨',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: '인증 권한이 없음',
      schema: {
        example: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        },
      },
    }),
  );
}

export function ChatAvailableSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiOperation({
      summary: '채팅방 이용 가능 여부 API',
      description: '해당 id 의 채팅방이 이용가능 한지 여부를 반환합니다.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '채팅방 이용 가능',
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '채팅방이 존재합니다.',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: '채팅방 이용 불가',
    }),
  );
}

export function GetRoomMembersSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiParam({
      name: 'id',
      description: '방 번호',
    }),
    ApiOperation({
      summary: '채팅방 멤버 수 API',
      description: '채팅방 번호를 Parameter 로 받아서 해당 방에 존재하는 유저 수를 찾습니다.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '채팅방 인원 수 반환',
      schema: {
        example: {
          memberCount: 5,
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: '존재하지 않는 채팅방',
    }),
  );
}

export function JoinChatRoomSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiBearerAuth(),
    ApiOperation({
      summary: '채팅방 입장 또는 생성 API',
      description: '사용자 희망 분야를 분석해서 채팅방을 찾고 없으면 생성하여 입장 처리합니다.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '채팅방 입장',
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          roomId: 2,
          message: '채팅방을 찾았습니다.',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: '채팅방 생성 및 입장',
      schema: {
        example: {
          statusCode: HttpStatus.CREATED,
          roomId: 2,
          message: '채팅방이 생성되었습니다.',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: '인증 권한이 없음',
      schema: {
        example: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        },
      },
    }),
  );
}

export function AddAnonymousPrefixSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiOperation({
      summary: '익명 사용자 접두어 추가 API',
      description: '15글자 이하 이름을 받아서 익명 사용자 이름에 부여되는 접두어를 추가합니다.',
    }),
    ApiBearerAuth(),
    ApiBody({
      description: '15글자 이하의 이름',
      schema: {
        example: {
          name: '안경을 박살낸',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '익명 사용자 접두어 추가를 성공하였습니다.',
        },
      },
    }),
    errorResHelper(),
  );
}

export function AddAnonymousNameSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiOperation({
      summary: '익명 사용자 이름 추가 API',
      description: '15글자 이하 이름을 받아서 익명 사용자 이름에 부여되는 접두어를 추가합니다.',
    }),
    ApiBearerAuth(),
    ApiBody({
      description: '15글자 이하의 이름',
      schema: {
        example: {
          name: '호이스팅',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '익명 사용자 이름 추가를 성공하였습니다.',
        },
      },
    }),
    errorResHelper(),
  );
}

export function ModifyAnonymousPrefixSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiOperation({
      summary: '익명 이름 접두어 수정 API',
      description: '익명 이름의 아이디와 변경 이름을 받아 수정합니다.',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      description: '변경 성공',
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '1번 데이터를 한번지린 으로 성공적으로 변경하였습니다.',
          name: '한번지린',
          id: 1,
        },
      },
    }),
    errorResHelper(),
  );
}

export function DeleteAnonymousPrefixSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiOperation({
      summary: '익명 이름 접두어 삭제 API',
      description: 'id 를 받아서 접두어를 삭제 처리합니다.',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '1번 데이터가 성공적으로 삭제되었습니다.',
          id: 1,
        },
      },
    }),
    errorResHelper(),
  );
}

export function ModifyAnonymousNameSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiOperation({
      summary: '익명 이름 수정 API',
      description: '아이디와 이름을 받아서 해당 아이디의 익명 이름을 수정합니다.',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '1번 데이터를 프런트준재 으로 성공적으로 변경하였습니다.',
          name: '프런트준재',
          id: 1,
        },
      },
    }),
    errorResHelper(),
  );
}
export function DeleteAnonymousNameSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiOperation({
      summary: '익명 이름 삭제 API',
      description: '아이디를 받아 해당 아이디 정보의 익명 이름을 삭제합니다.',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '1번 데이터가 성공적으로 삭제되었습니다.',
          id: 1,
        },
      },
    }),
    errorResHelper(),
  );
}

export function FindAllAnonymousPrefixSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiOperation({
      summary: '익명 접두어 이름 불러오기 API',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '익명 접두어 목록을 성공적으로 불러왔습니다.',
          list: [
            {
              id: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              name: '황당한',
            },
            {
              id: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
              name: '안경이 박살난',
            },
          ],
        },
      },
    }),
    errorResHelper(),
  );
}

export function FindAllAnonymousNameSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiOperation({
      summary: '익명 이름 불러오기 API',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          message: '익명 이름 목록을 성공적으로 불러왔습니다.',
          list: [
            {
              id: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              name: '어피치',
            },
            {
              id: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
              name: '제이지',
            },
          ],
        },
      },
    }),
    errorResHelper(),
  );
}
