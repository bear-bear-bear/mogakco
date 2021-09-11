import React, { useState } from 'react';

import ImageLogo from '@assets/svg/logo2.svg';
import useUser from '@hooks/useUser';
import type { IUserInfo } from 'typings/auth';

import * as S from './style';

const Profile = () => {
  const { user } = useUser();
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal((prev) => !prev);
  };

  return (
    <S.Profile>
      <S.LogoWrapper>
        <ImageLogo onClick={toggleModal} />
      </S.LogoWrapper>
      <S.ProfileModal isShow={isShowModal}>
        <p>준재김</p>
      </S.ProfileModal>
    </S.Profile>
  );
};

export default Profile;
