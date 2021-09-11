import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import ImageLogo from '@assets/svg/logo2.svg';
import useUser from '@hooks/useUser';
import type { IUserInfo } from 'typings/auth';

import * as S from './style';

export interface ProfileProps {
  modalPosition: 'left' | 'right';
}

const PARENT_ID = 'togglableProfile';
const PARENT_TAGNAME = 'article'; // S.Profile 과 element 동일해야함

const Profile = ({ modalPosition }: ProfileProps) => {
  const { user } = useUser();
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal((prev) => !prev);
  };

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const parent = target.closest(PARENT_TAGNAME);
      if (!isShowModal) return;
      if (parent?.id === PARENT_ID) return;

      setIsShowModal(false);
    };

    window.addEventListener('click', closeModal);
    return () => window.removeEventListener('click', closeModal);
  }, [isShowModal]);

  return (
    <S.Profile id={PARENT_ID}>
      <S.LogoWrapper>
        <ImageLogo onClick={toggleModal} />
      </S.LogoWrapper>
      <S.ProfileModal isShow={isShowModal} modalPosition={modalPosition}>
        <section>
          <header>현재 로그인 계정</header>
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
    </S.Profile>
  );
};

export default Profile;
