import React from 'react';
import useUser from '@hooks/useUser';
import type { ChatFile } from 'typings/chat';

import * as S from './style';

const FileChat = ({ username, info, ownerId }: ChatFile) => {
  const { user } = useUser();
  const { filename, size, url } = info;

  const onClickFileContent = () => {
    // File download logic with content.url
  };

  return (
    <S.ChatWrapper isMyChat={ownerId === user?.id}>
      <S.Writer>{username}</S.Writer>
      <S.FileContent onClick={onClickFileContent}>
        <p>{filename}</p>
        <p>{size}</p>
      </S.FileContent>
    </S.ChatWrapper>
  );
};

export default FileChat;
