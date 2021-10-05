import React, { useState, useContext } from 'react';
import { SideSectionShowContext } from '@components/video-chat/Container';

import useDropzone from './useDropzone';
import * as S from './style';

const Container: React.FC = ({ children }) => {
  const [sideSectionShowState, toggleSideSection] = useContext(
    SideSectionShowContext,
  );
  const [isShowDropzoneUI, setIsShowDropzoneUI] = useState<boolean>(false);
  const { getRootProps, getInputProps } = useDropzone({ setIsShowDropzoneUI });

  const handleChatCloseButtonClick = () => {
    toggleSideSection('chat', { justOff: true });
  };

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
      </S.Container>
    </div>
  );
};

export default Container;
