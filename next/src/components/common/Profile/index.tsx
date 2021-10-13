import React, { useEffect, useState } from 'react';
import ProfileModal from './Modal';
import Trigger from './Trigger';

import * as S from './style';

export interface ProfileProps {
  modalDirection: 'left' | 'right';
}

const CONTAINER_ID = 'togglableProfile';
const CONTAINER_TAGNAME = 'article'; // S.Container 과 element 동일해야함

const Profile = ({ modalDirection }: ProfileProps) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal((prev) => !prev);
  };

  // Set display to 'none' when click anywhere except this component
  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const parent = target.closest(CONTAINER_TAGNAME);
      if (!isShowModal) return;
      if (parent?.id === CONTAINER_ID) return;

      setIsShowModal(false);
    };

    window.addEventListener('click', closeModal);
    return () => window.removeEventListener('click', closeModal);
  }, [isShowModal]);

  return (
    <S.Container id={CONTAINER_ID}>
      <Trigger toggleModal={toggleModal} />
      <ProfileModal isShow={isShowModal} direction={modalDirection} />
    </S.Container>
  );
};

export default Profile;
