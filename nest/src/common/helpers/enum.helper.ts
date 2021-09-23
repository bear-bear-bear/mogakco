export enum SwaggerTag {
  AUTH = '인증 API',
  USER = '유저 API',
  CHAT = '채팅 API',
  TEST = '테스트 API',
}

export enum ServerMessage {
  INTERVAL = '서버에서 에러가 발생하였습니다.',
  MISSING_FORM = '폼 요청 정보가 잘못되었습니다.',
  BAD_REQUEST = '잘못된 접근입니다.',
}

export enum ServerEnviroment {
  DEV = 'development',
  TEST = 'test',
  PROD = 'production',
}
