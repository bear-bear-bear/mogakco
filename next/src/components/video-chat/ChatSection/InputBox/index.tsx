import React, { createContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import Header from './Header';
import Editor from './Editor';
import Textarea from './TextArea';
import * as S from './style';

export const EditorShowContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => undefined]);

const InputBox = () => {
  const showEditorState = useState(false);
  const isShowEditor = showEditorState[0];

  return (
    <EditorShowContext.Provider value={showEditorState}>
      <S.InputBox>
        <Header />
        <Textarea />
      </S.InputBox>
      {isShowEditor && <Editor />}
    </EditorShowContext.Provider>
  );
};

export default InputBox;
