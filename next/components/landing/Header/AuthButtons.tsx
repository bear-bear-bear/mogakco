import React from 'react';
import Link from 'next/link';

import { Props } from '@pages/index';
import Button from '@components/common/Button';

import * as S from '@components/landing/Header/style';
import { useRouter } from 'next/router';
import { logOutApi } from '@lib/fetchers';
import { Memory, memoryStore } from '@lib/apiClient';

const AuthButtons = ({ isLogin }: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    logOutApi()
      .then(() => {
        const now = new Date().toString();
        memoryStore.delete(Memory.ACCESS_TOKEN);
        localStorage.setItem('log-out', now);
        router.push('/');
      })
      .catch(() => router.push('/'));
  };

  return (
    <>
      {!isLogin && (
        <S.ButtonsWrapper>
          <Link href="/sign-in">
            <a>
              <Button color="black" underline>
                로그인
              </Button>
            </a>
          </Link>
          <Link href="/sign-up">
            <a>
              <Button color="black" underline>
                회원가입
              </Button>
            </a>
          </Link>
        </S.ButtonsWrapper>
      )}

      {isLogin && (
        <S.ButtonsWrapper>
          <Button color="black" underline onClick={handleLogout}>
            로그아웃
          </Button>
        </S.ButtonsWrapper>
      )}
    </>
  );
};

export default AuthButtons;
