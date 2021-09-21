import Profile from '@components/common/Profile';
import * as S from './style';

const Sidebar = () => {
  return (
    <S.Sidebar>
      <Profile modalDirection="right" />
      <S.BottomSection>
        <S.CalendarIcon />
        <S.ChatIcon />
      </S.BottomSection>
    </S.Sidebar>
  );
};

export default Sidebar;
