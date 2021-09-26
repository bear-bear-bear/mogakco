import React, { KeyboardEvent, useCallback, useState } from 'react';

import useInput from '@hooks/useInput';
import useChatClient from '@hooks/useChatClient';

import { ChatEvent } from '@lib/enum';
import Editor from './TuiEditor';
import SVGButton from './SVGButton';
import * as S from './style';

const InputBox = () => {
  const [isShowEditor, setIsShowEditor] = useState(false);
  const [chat, onChangeChat, setChat] = useInput('');
  const socketClient = useChatClient();

  const handleFileUploadButtonClick = () => {
    alert('파일 업로드 미구현');
  };

  const handleEditorPopUpButtonClick = () => {
    setIsShowEditor(true);
  };

  const sendChat = useCallback(
    (message: string) => {
      if (!socketClient) return;

      const clearedChat = message.trim();
      if (clearedChat === '') return;

      socketClient.emit(ChatEvent.SEND_CHAT, clearedChat);
      setChat('');
    },
    [socketClient, setChat],
  );

  const handleEnterKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();

      if (e.shiftKey) {
        setChat((prev) => `${prev}\n`);
        return;
      }

      sendChat(chat);
    },
    [chat, sendChat, setChat],
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
          value={chat}
          onKeyDown={handleEnterKeyDown}
          onChange={onChangeChat}
          maxLength={255}
          placeholder="여기에 메세지 입력..."
        />
      </S.InputBox>
      {isShowEditor && (
        <Editor
          setIsShow={setIsShowEditor}
          currChat={chat}
          setChat={setChat}
          sendChat={sendChat}
        />
      )}
    </>
  );
};

export default InputBox;
