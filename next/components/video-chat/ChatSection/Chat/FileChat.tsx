import React from 'react';
import * as S from './style';

const FileChat = ({ nickname, content }) => {
  const { filename, size, url } = content;

  const onClickFileContent = () => {
    // File download logic with content.url
  }

  return (
    <S.ChatWrapper>
      <S.Writer>{nickname}</S.Writer>
      <S.FileContent onClick={onClickFileContent}>
        <p>{filename}</p>
        <p>{size}</p>
      </S.FileContent>
    </S.ChatWrapper>
  );
};

export default FileChat;
