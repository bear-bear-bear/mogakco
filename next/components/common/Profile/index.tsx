import React, { useEffect, useState } from 'react';
import ImageLogo from '@assets/svg/logo2.svg';
import ProfileModal from './ProfileModal';

import * as S from './style';

interface ProfileProps {
  modalDirection: 'left' | 'right';
}

const PARENT_ID = 'togglableProfile';
const PARENT_TAGNAME = 'article'; // S.Profile 과 element 동일해야함

const Profile = ({ modalDirection }: ProfileProps) => {
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
      <ProfileModal isShow={isShowModal} direction={modalDirection} />
    </S.Profile>
  );
};

export default Profile;
