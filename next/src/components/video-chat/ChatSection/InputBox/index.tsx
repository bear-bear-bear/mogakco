import React, { KeyboardEvent, useCallback, useContext } from 'react';

import useInput from '@hooks/useInput';
import { SocketContext } from '@pages/video-chat/[id]';

import * as S from './style';

const InputBox = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const client = useContext(SocketContext);

  const handleFileAddButtonClick = () => {
    alert('파일 업로드 미구현');
  };

  const sendChat = useCallback(() => {
    if (!client) return;

    const clearedChat = chat.trim();
    if (clearedChat === '') return;

    client.emit('chat', clearedChat);
    setChat('');
  }, [chat, client, setChat]);

  const handleEnterKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();

      if (e.shiftKey) {
        setChat((prev) => `${prev}\n`);
        return;
      }

      sendChat();
    },
    [sendChat, setChat],
  );

  return (
    <S.InputBox>
      <S.Header>
        <S.FileAddButton onClick={handleFileAddButtonClick} />
      </S.Header>
      <S.TempTextArea
        value={chat}
        onKeyDown={handleEnterKeyDown}
        onChange={onChangeChat}
        maxLength={255}
        placeholder="여기에 메세지 입력..."
      />
      <S.TempSendButton onClick={sendChat} />
    </S.InputBox>
  );
};

export default InputBox;
