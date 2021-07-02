export type InputValues = {
  username: string;
  password: string;
  passwordConfirm: string;
  term: boolean;
};

export type InputErrorStates = {
  isUsernameError: boolean;
  isPasswordTestError: boolean;
  isPasswordMatchError: boolean;
  isTermError: boolean;
};
