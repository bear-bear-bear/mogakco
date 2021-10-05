import { useContext } from 'react';
import _ from 'lodash';
import Profile from '@components/common/Profile';
import { SideSectionShowContext } from '@components/video-chat/Container';

import SVGButton from '@components/common/SVGButton';
import * as S from './style';

const Sidebar = () => {
  const [sideSectionShowState, toggleSideSection] = useContext(
    SideSectionShowContext,
  );

  const handleChatIconClick = () => {
    toggleSideSection('chat');
  };

  const handleCalendarIconClick = () => {
    alert('달력 미구현');
  };

  const handleUserIconClick = () => {
    toggleSideSection('userList');
  };

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
        <SVGButton
          SvgComponent={S.UserIcon}
          buttonProps={{
            title: sideSectionShowState.userList
              ? '사용자 목록 닫기'
              : '사용자 목록 열기',
            'aria-label': 'Toggle user list',
          }}
          onClick={handleUserIconClick}
        />
      </S.BottomSection>
    </S.Sidebar>
  );
};

export default Sidebar;
