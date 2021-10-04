import { useContext } from 'react';
import Profile from '@components/common/Profile';
import { ChatShowContext } from '@pages/video-chat/[id]';

import * as S from './style';

const Sidebar = () => {
  const [, setIsShowChat] = useContext(ChatShowContext);
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
        <S.CalendarIcon onClick={handleCalendarIconClick} />
        <S.ChatIcon onClick={handleChatIconClick} />
        <S.UserIcon onClick={handleUserIconClick} />
      </S.BottomSection>
    </S.Sidebar>
  );
};

export default Sidebar;
