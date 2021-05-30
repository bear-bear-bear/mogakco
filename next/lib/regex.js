// username: 유저 닉네임, 영문/한글/숫자/마침표 1-12자
export const usernameRule = /^[가-힣a-zA-Z0-9.]{1,12}$/;

// email: 이메일
export const emailRule =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

// password: 비밀번호, 영문자, 숫자, 특수문자 각각 1개 이상 포함한 8-50자
export const passwordRule =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,}$/;
