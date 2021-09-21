import React from 'react';
import type { ChatAnnouncement } from 'typings/chat';

import * as S from '../Chat/style';

const explains: { [AnnounceType: string]: string } = {
  enter: '입장하셨습니다.',
  exit: '퇴장하셨습니다.',
  kick: '강제퇴장 되었습니다.',
};

const Announcement = ({ type, username }: ChatAnnouncement) => {
  const announce = (announceType: string, name: string) =>
    `${name} 님이 ${explains[announceType]}`;

  return (
    <S.AnnouncemnetWrapper>
      <S.Announcement type={type}>{announce(type, username)}</S.Announcement>
    </S.AnnouncemnetWrapper>
  );
};

export default Announcement;
