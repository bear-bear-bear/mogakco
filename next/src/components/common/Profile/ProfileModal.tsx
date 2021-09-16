import React from 'react';
import Link from 'next/link';

import useUser from '@hooks/useUser';
import { authProlongTestApi, signOutApi } from '@lib/apis';
import token from '@lib/token';
import { logAxiosError } from '@lib/apiClient';
import type { GeneralAxiosError } from 'typings/common';
import type { IUserInfo } from 'typings/auth';

import * as S from './style';

export interface ProfileModalProps {
  isShow: boolean;
  direction: 'left' | 'right';
}

const ProfileModal = ({ isShow, direction }: ProfileModalProps) => {
  const { user, mutateUser } = useUser();

  const onClickTestButton = async () => {
    await authProlongTestApi();
  };

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
  const { username, email } = user as IUserInfo;
  return (
    <S.ProfileModal isShow={isShow} direction={direction}>
      <section className="profile-section">
        <header>현재 로그인 계정</header>
        <section className="profile-section__account">
          <Link href="/my-page">
            <a>{username.substring(0, 2)}</a>
          </Link>
          <p>{username}</p>
          <p>{email}</p>
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
          <li>
            <button
              type="button"
              className="profile-section__list__item"
              onClick={onClickTestButton}
            >
              로그인 연장 테스트
            </button>
          </li>
        </ul>
      </section>
    </S.ProfileModal>
  );
};

export default ProfileModal;
