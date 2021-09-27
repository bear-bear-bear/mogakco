import React, { useCallback, useContext, useState } from 'react';
import type { KeyboardEvent } from 'react';

import Editor from './TuiEditor';
import SVGButton from './SVGButton';
import { ChatContext } from './chatContext';
import * as S from './style';

const InputBox = () => {
  const [isShowEditor, setIsShowEditor] = useState(false);
  const chat = useContext(ChatContext);

  const handleFileUploadButtonClick = () => {
    alert('파일 업로드 미구현');
  };

  const handleEditorPopUpButtonClick = () => {
    setIsShowEditor(true);
  };

  const handleEnterKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();

      if (e.shiftKey) {
        chat.set((prev) => `${prev}\n`);
        return;
      }

      chat.send(chat.get());
    },
    [chat],
  );

  return (
    <>
      <S.InputBox>
        <S.Header>
          <SVGButton
            SvgComponent={S.EditorPopUpSVG}
            buttonProps={{
              title: '마크다운 에디터 사용하기',
              'aria-label': 'Open markdown editor',
            }}
            onClick={handleEditorPopUpButtonClick}
          />
          <SVGButton
            SvgComponent={S.FileUploadSVG}
            buttonProps={{
              title: '파일 업로드',
              'aria-label': 'Upload files',
            }}
            onClick={handleFileUploadButtonClick}
          />
        </S.Header>
        <S.TextArea
          value={chat.get()}
          onKeyDown={handleEnterKeyDown}
          onChange={chat.onChange}
          maxLength={255}
          placeholder="여기에 메세지 입력..."
        />
      </S.InputBox>
      {isShowEditor && <Editor setIsShow={setIsShowEditor} />}
    </>
  );
};

export default InputBox;
