import React, { KeyboardEvent } from 'react';

import useInput from '@hooks/useInput';
import { socketServer } from '@pages/_app';

import * as S from './style';

const InputBox = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const handleChat = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (chat.trim() !== '') {
      if (e.code === 'Enter' && !e.altKey) {
        socketServer.emit('chat', chat);
        setChat('');
      }
      if (e.code === 'Enter' && e.altKey) {
        setChat((prev) => `${prev}\n`);
      }
    }
  };

  return (
    <S.InputBox>
      <S.Header>
        <S.FileAddButton />
      </S.Header>
      <S.TempTextArea
        maxRows={10}
        value={chat}
        onKeyDown={handleChat}
        onChange={onChangeChat}
        placeholder="여기에 메세지 입력..."
      />
      <S.TempSendButton />
    </S.InputBox>
  );
};

export default InputBox;
