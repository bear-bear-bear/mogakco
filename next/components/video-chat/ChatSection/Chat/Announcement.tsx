import React from 'react';
import * as S from './style';

const explains: { [AnnounceType: string]: string } = {
  enter: '입장하셨습니다.',
  exit: '퇴장하셨습니다.',
  kick: '강제퇴장 되었습니다.',
};

const Announcement = ({ type, nickname }: any) => {
  const announce = (announceType: string, name: string) =>
    `${name} 님이 ${explains[announceType]}`;

  return (
    <S.ChatWrapper>
      <S.Announcement type={type}>{announce(type, nickname)}</S.Announcement>
    </S.ChatWrapper>
  );
};

export default Announcement;
