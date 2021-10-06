import React, { useContext } from 'react';
import { SideSectionShowContext } from '@components/video-chat/Container';

import * as S from './style';

const Container: React.FC = ({ children }) => {
  const [sideSectionShowState, toggleSideSection] = useContext(
    SideSectionShowContext,
  );

  const handleSectionCloseButtonClick = () => {
    toggleSideSection('userList', { justOff: true });
  };

  return (
    <S.Container isShow={sideSectionShowState.userList}>
      <S.Header>
        <S.Title>모여있는 사람들</S.Title>
        <S.SectionCloseButton onClick={handleSectionCloseButtonClick} />
      </S.Header>

      {children}
    </S.Container>
  );
};

export default Container;
