import React, { createContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import * as S from './style';

type SideSectionShowState = {
  chat: boolean;
  userList: boolean;
};

export const SideSectionShowContext = createContext<
  [SideSectionShowState, Dispatch<SetStateAction<SideSectionShowState>>]
>([
  {
    chat: false,
    userList: false,
  },
  () => undefined,
]);

const Container: React.FC = ({ children }) => {
  const sideSectionShowState = useState<SideSectionShowState>({
    chat: true,
    userList: false,
  });

  return (
    <SideSectionShowContext.Provider value={sideSectionShowState}>
      <S.Container>{children}</S.Container>
    </SideSectionShowContext.Provider>
  );
};

export default Container;
