import React, { useState, useContext, useEffect } from 'react';

import { SideSectionShowContext } from '@components/video-chat/Container';
import DropzoneErrorsModal from '@components/common/Modal';

import useDropzone from './useDropzone';
import * as S from './style';

const Container: React.FC = ({ children }) => {
  const [sideSectionShowState, toggleSideSection] = useContext(
    SideSectionShowContext,
  );
  const [isShowDropzoneUI, setIsShowDropzoneUI] = useState<boolean>(false);
  const [{ getRootProps, getInputProps }, dropzoneErrorState] = useDropzone({
    setIsShowDropzoneUI,
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => {
    setIsOpenModal(false);
    dropzoneErrorState.set([]);
  };

  const handleChatCloseButtonClick = () => {
    toggleSideSection('chat', { justOff: true });
  };

  useEffect(() => {
    if (dropzoneErrorState.curr.length !== 0) {
      openModal();
    }
  }, [dropzoneErrorState.curr.length]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <S.Container
        isShow={sideSectionShowState.chat}
        isShowDropzoneUI={isShowDropzoneUI}
      >
        <S.Header>
          <S.ChatCloseButton onClick={handleChatCloseButtonClick} />
          <S.ChatTitle>채팅</S.ChatTitle>
        </S.Header>

        {children}

        {isShowDropzoneUI && (
          <S.Dropzone>
            <S.FileAddIcon />
          </S.Dropzone>
        )}
        <DropzoneErrorsModal
          open={isOpenModal}
          onClose={closeModal}
          content={dropzoneErrorState.curr}
        />
      </S.Container>
    </div>
  );
};

export default Container;
