import React from 'react';
import Link from 'next/link';

import useUser from '@hooks/useUser';
import { signOutApi } from '@lib/apis';
import token from '@lib/token';
import { logAxiosError } from '@lib/apiClient';
import type { GeneralAxiosError } from 'typings/common';
import type { IUserGetSuccessResponse } from 'typings/auth';

import * as S from './style';

export interface ModalProps {
  isShow: boolean;
  direction: 'left' | 'right';
}

const Modal = ({ isShow, direction }: ModalProps) => {
  const { user, mutateUser } = useUser();

  const handleSignOut = async () => {
    try {
      mutateUser({ isLoggedIn: false }, false);
      await signOutApi();
      token.delete();
      mutateUser();
    } catch (error) {
      logAxiosError(error as GeneralAxiosError);
    }
  };

  if (!user?.isLoggedIn) return null;
  const { username, email } = user as IUserGetSuccessResponse;
  return (
    <S.Modal isShow={isShow} direction={direction}>
      <section className="profile-section">
        <header>현재 로그인 계정</header>
        <section className="profile-section__account">
          <Link href="/my-page">
            <a>{username.substring(0, 2)}</a>
          </Link>
          <p>{username}</p>
          <p title={email}>{email}</p>
        </section>
      </section>
      <section className="profile-section">
        <header>옵션 더 보기</header>
        <ul className="profile-section__list">
          <li>
            <Link href="/my-page/account-setting">
              <a className="profile-section__list__item">설정</a>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="profile-section__list__item"
              onClick={handleSignOut}
            >
              로그아웃
            </button>
          </li>
        </ul>
      </section>
    </S.Modal>
  );
};

export default Modal;
