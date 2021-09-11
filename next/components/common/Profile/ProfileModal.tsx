import Link from 'next/link';
import useUser from '@hooks/useUser';
import type { IUserInfo } from 'typings/auth';
import * as S from './style';

export interface ProfileModalProps {
  isShow: boolean;
  direction: 'left' | 'right';
}

const ProfileModal = ({ isShow, direction }: ProfileModalProps) => {
  const { user } = useUser();

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
            <button type="button">로그아웃</button>
          </li>
        </ul>
      </section>
    </S.ProfileModal>
  );
};

export default ProfileModal;
