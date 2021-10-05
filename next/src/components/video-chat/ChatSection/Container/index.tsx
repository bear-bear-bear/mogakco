import React, { useEffect, useState, useContext } from 'react';
import { ChatEvent } from '@lib/enum';
import useChatClient from '@hooks/chat/useChatClient';
import { SideSectionShowContext } from '@components/video-chat/Container';

import useDropzone from './useDropzone';
import * as S from './style';

const Container: React.FC = ({ children }) => {
  const socketClient = useChatClient();
  const [memberCount, setMemberCount] = useState<number>(0);
  const [sideSectionShowState, toggleSideSection] = useContext(
    SideSectionShowContext,
  );
  const [isShowDropzoneUI, setIsShowDropzoneUI] = useState<boolean>(false);
  const { getRootProps, getInputProps } = useDropzone({ setIsShowDropzoneUI });

  const handleChatCloseButtonClick = () => {
    toggleSideSection('chat', { justOff: true });
  };

  useEffect(() => {
    socketClient.on(ChatEvent.GET_MEMBER_COUNT, (count: number) => {
      setMemberCount(count);
    });

    return () => {
      socketClient.off(ChatEvent.GET_MEMBER_COUNT);
    };
  }, [socketClient]);

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
          <S.ChatMemberCount>{memberCount}</S.ChatMemberCount>
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
