import decoratorHelper from '@common/helpers/decorator.helper';
import { SwaggerTag } from '@common/helpers/enum.helper';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ChatAvailableSwagger() {
  return decoratorHelper(
    SwaggerTag.CHAT,
    ApiOperation({
      summary: '채팅방 이용 가능 여부 API',
      description: '해당 id 의 채팅방이 이용가능 한지 여부를 반환합니다.',
    }),
    ApiResponse({
      status: 200,
      description: '채팅방 이용 가능',
    }),
    ApiResponse({
      status: 400,
      description: '채팅방 이용 불가',
    }),
  );
}
