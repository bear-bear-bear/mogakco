import React, { createContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import * as S from './style';

export const ChatShowContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => undefined]);

const Container: React.FC = ({ children }) => {
  const chatShowState = useState<boolean>(true);

  return (
    <ChatShowContext.Provider value={chatShowState}>
      <S.Container>{children}</S.Container>
    </ChatShowContext.Provider>
  );
};

export default Container;
