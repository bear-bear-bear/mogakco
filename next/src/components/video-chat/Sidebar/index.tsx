import { useContext } from 'react';
import Profile from '@components/common/Profile';
import { ChatShowContext } from '@components/video-chat/Container';

import SVGButton from '@components/common/SVGButton';
import * as S from './style';

const Sidebar = () => {
  const [isShowChat, setIsShowChat] = useContext(ChatShowContext);

  const handleChatIconClick = () => {
    setIsShowChat((prev) => !prev);
  };

  const handleCalendarIconClick = () => {
    alert('달력 미구현');
  };

  const handleUserIconClick = () => {
    alert('유저 리스트 미구현');
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
            title: isShowChat ? '채팅창 닫기' : '채팅창 열기',
            'aria-label': 'Toggle chat section',
          }}
          onClick={handleChatIconClick}
        />
        <SVGButton
          SvgComponent={S.UserIcon}
          buttonProps={{
            title: '유저 리스트',
            'aria-label': 'Toggle user list',
          }}
          onClick={handleUserIconClick}
        />
      </S.BottomSection>
    </S.Sidebar>
  );
};

export default Sidebar;
