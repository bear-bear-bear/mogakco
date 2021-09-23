export enum APIs {
  // Sign
  LOGIN = '/api/auth/login',
  AUTH_TEST = '/api/auth/test',
  REFRESH_TOKEN = '/api/auth/refresh-token',
  LOGOUT = '/api/auth/logout',
  GET_AUTHENTICATION = '/api/auth/user',
  JOIN = '/api/auth',

  // Email
  SEND_EMAIL = '/api/auth/send-token/before-register',
  EMAIL_VERIFICATION = '/api/auth/verify-email/before-register',
  GET_EMAIL_VERIFICATION = '/api/auth/is-verified/before-register',

  // User
  UPDATE_USER_SELF = '/api/user',
  DELETE_USER_SELF = '/api/user',

  // Chat
  ADD_ANONYMOUS_PREFIX_NAME = '/api/chat/anonymous/prefix-name',
  ADD_ANONYMOUS_NAME = '/api/chat/anonymous/name',
}

export enum TestUtil {
  EMAIL = 'mocktest@test.com',
  USERNAME = 'testuser',
  PASSWORD = '@Testmo12',

  ADMIN_EMAIL = 'admin@admin.com',
  ADMIN_USERNAME = 'admin',
  ADMIN_PASSWORD = 'admin',
}
