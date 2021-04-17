import { HttpException, HttpStatus } from '@nestjs/common';
import { EmailSucProps } from './types';

const errWrapConsole = (message: string, err: Error) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
    console.log(
      '================================================================',
    );
    console.log(`reason: ${err}`);
    console.log(
      '================================================================',
    );
  }
  return null;
};

// Deprecated
export const emailSuccess = ({ envelope: { to } }: EmailSucProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${to[0]} 으로 이메일이 성공적으로 전송되었습니다.`);
  }
};

// Deprecated
export const emailFailure = (err: Error) =>
  errWrapConsole('Email transfer failed', err);

export const prepareFailure = (err: Error) => {
  errWrapConsole('An Error occurs prepareJoin Controller.', err);
  throw new HttpException(
    '이메일 전송에 실패 하였습니다.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
