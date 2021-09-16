import decoratorHelper from '@common/helpers/decorator.helper';
import { SwaggerTag } from '@common/helpers/enum.helper';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

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
