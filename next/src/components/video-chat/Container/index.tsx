import React, { createContext } from 'react';

import useSideSectionToggle from './useSideSectionToggle';
import type { ToggleSection } from './useSideSectionToggle';
import * as S from './style';

type SideSectionShowState = {
  chat: boolean;
  userList: boolean;
};

export const SideSectionShowContext = createContext<
  [SideSectionShowState, ToggleSection<SideSectionShowState>]
>([
  {
    chat: false,
    userList: false,
  },
  () => undefined,
]);

const Container: React.FC = ({ children }) => {
  const sideSectionShowState = useSideSectionToggle<SideSectionShowState>({
    chat: true,
    userList: false,
  });

  return (
    <S.Container>
      <SideSectionShowContext.Provider value={sideSectionShowState}>
        {children}
      </SideSectionShowContext.Provider>
    </S.Container>
  );
};

export default Container;
