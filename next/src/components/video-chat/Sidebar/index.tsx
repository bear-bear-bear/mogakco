import type { Dispatch, SetStateAction } from 'react';
import Profile from '@components/common/Profile';
import * as S from './style';

interface SidebarProps {
  setIsShowChat: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setIsShowChat }: SidebarProps) => {
  const handleChatIconClick = () => {
    setIsShowChat((prev) => !prev);
  };

  const handleCalendarIconClick = () => {
    alert('달력 미구현');
  };

  return (
    <S.Sidebar>
      <Profile modalDirection="right" />
      <S.BottomSection>
        <S.CalendarIcon onClick={handleCalendarIconClick} />
        <S.ChatIcon onClick={handleChatIconClick} />
      </S.BottomSection>
    </S.Sidebar>
  );
};

export default Sidebar;
