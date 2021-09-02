import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

export type ResolveType = (e: string) => void;

export default async (plain: string) =>
  new Promise((resolve: ResolveType, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) reject(new HttpException('salt 생성 실패', HttpStatus.INTERNAL_SERVER_ERROR));
      bcrypt.hash(plain, salt, (hashErr, hash) => {
        if (hashErr)
          reject(new HttpException('평문 해시화 실패', HttpStatus.INTERNAL_SERVER_ERROR));
        resolve(hash);
      });
    });
  });
