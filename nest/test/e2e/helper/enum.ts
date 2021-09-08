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
}

export enum TestUtil {
  EMAIL = 'mockTest@test.com',
}
