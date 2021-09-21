import React, { KeyboardEvent, useContext } from 'react';

import useInput from '@hooks/useInput';
import { SocketContext } from '@pages/video-chat/[id]';

import * as S from './style';

const InputBox = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const client = useContext(SocketContext);

  const sendChat = () => {
    if (!client) return;

    const clearedChat = chat.trim();
    if (clearedChat === '') return;

    client.emit('chat', clearedChat);
    setChat('');
  };

  const handleEnterKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code !== 'Enter') return;
    e.preventDefault();

    if (e.altKey) {
      setChat((prev) => `${prev}\n`);
      return;
    }

    sendChat();
  };

  return (
    <S.InputBox>
      <S.Header>
        <S.FileAddButton />
      </S.Header>
      <S.TempTextArea
        value={chat}
        onKeyDown={handleEnterKeyDown}
        onChange={onChangeChat}
        placeholder="여기에 메세지 입력..."
      />
      <S.TempSendButton onClick={sendChat} />
    </S.InputBox>
  );
};

export default InputBox;
