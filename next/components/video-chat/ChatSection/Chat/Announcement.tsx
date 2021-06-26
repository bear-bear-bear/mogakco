import React, { useCallback } from 'react';
import * as S from './style';

const Announcement = ({ type, nickname }: any) => {
  const announce = useCallback((announceType, name) => {
    const explains: { [AnnounceType: string]: string } = {
      enter: '입장하셨습니다.',
      exit: '퇴장하셨습니다.',
      kick: '강제퇴장 되었습니다.',
    };
    return `${name} 님이 ${explains[announceType]}`;
  }, []);

  return (
    <S.ChatWrapper>
      <S.Announcement type={type}>{announce(type, nickname)}</S.Announcement>
    </S.ChatWrapper>
  );
};

export default Announcement;
