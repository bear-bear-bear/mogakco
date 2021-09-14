import * as S from '@components/video-chat/ChatSection/Chat/style';
import React from 'react';

const MyTextChat = ({ nickname, content }: any) => {
  return (
    <S.MyChatWrapper>
      <S.Writer>{nickname}</S.Writer>
      <S.TextContent>{content}</S.TextContent>
    </S.MyChatWrapper>
  );
};

export default MyTextChat;
