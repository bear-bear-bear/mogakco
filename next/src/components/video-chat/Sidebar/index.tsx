import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import useChatClient from '@hooks/chat/useChatClient';
import { ChatEvent } from '@lib/enum';
import Profile from '@components/common/Profile';
import { SideSectionShowContext } from '@components/video-chat/Container';
import SVGButton from '@components/common/SVGButton';

import * as S from './style';

const Sidebar = () => {
  const socketClient = useChatClient();
  const [sideSectionShowState, toggleSideSection] = useContext(
    SideSectionShowContext,
  );
  const [memberCount, setMemberCount] = useState<number>(0);

  const handleChatIconClick = () => {
    toggleSideSection('chat');

    console.log(sideSectionShowState);
  };

  const handleCalendarIconClick = () => {
    alert('달력 미구현');
  };

  const handleUserIconClick = () => {
    toggleSideSection('userList');
    console.log(sideSectionShowState);
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
    <S.Sidebar>
      <Profile modalDirection="right" />
      <S.BottomSection>
        <SVGButton
          SvgComponent={S.CalendarIcon}
          buttonProps={{
            title: '일정 관리',
            'aria-label': 'Open schedule management',
          }}
          onClick={handleCalendarIconClick}
        />
        <SVGButton
          SvgComponent={S.ChatIcon}
          buttonProps={{
            title: sideSectionShowState.chat //
              ? '채팅창 닫기'
              : '채팅창 열기',
            'aria-label': 'Toggle chat section',
          }}
          onClick={handleChatIconClick}
        />
        <S.RelativeArea>
          <SVGButton
            SvgComponent={S.UserIcon}
            buttonProps={{
              title: sideSectionShowState.userList
                ? '사용자 목록창 닫기'
                : '사용자 목록창 열기',
              'aria-label': 'Toggle user list',
            }}
            onClick={handleUserIconClick}
          />
          <S.MemberCount>{memberCount}</S.MemberCount>
        </S.RelativeArea>
      </S.BottomSection>
    </S.Sidebar>
  );
};

export default Sidebar;
