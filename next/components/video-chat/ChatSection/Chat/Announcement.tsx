import React from 'react';
import * as S from '../Chat/style';
import { ChatAnnouncement } from '../../../../typings/chat';

const explains: { [AnnounceType: string]: string } = {
  enter: '입장하셨습니다.',
  exit: '퇴장하셨습니다.',
  kick: '강제퇴장 되었습니다.',
};

const Announcement = ({ type, username }: ChatAnnouncement) => {
  const announce = (announceType: string, name: string) =>
    `${name} 님이 ${explains[announceType]}`;

  return (
    <S.ChatWrapper>
      <S.Announcement type={type}>{announce(type, username)}</S.Announcement>
    </S.ChatWrapper>
  );
};

export default Announcement;
