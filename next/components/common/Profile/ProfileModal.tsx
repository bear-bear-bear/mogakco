import Link from 'next/link';

import useUser from '@hooks/useUser';
import { signOutApi } from '@lib/apis';
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
      <section>
        <header>현재 로그인 계정</header>
        <p>{username}</p>
        <p>{email}</p>
      </section>
      <section>
        <header>옵션 더 보기</header>
        <ul>
          <li>
            <Link href="/my-page/account-setting">
              <a>설정</a>
            </Link>
          </li>
          <li>
            <button type="button" onClick={handleSignOut}>
              로그아웃
            </button>
          </li>
        </ul>
      </section>
    </S.ProfileModal>
  );
};

export default ProfileModal;
