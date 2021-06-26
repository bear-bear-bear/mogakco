import React from 'react';
import * as S from './style';

const TextChat = ({ nickname, content }: any) => {
  return (
    <S.ChatWrapper>
      <S.Writer>{nickname}</S.Writer>
      <S.TextContent>{content}</S.TextContent>
    </S.ChatWrapper>
  );
};

export default TextChat;
