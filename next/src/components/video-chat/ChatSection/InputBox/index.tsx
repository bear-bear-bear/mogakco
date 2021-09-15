import React, { KeyboardEvent } from 'react';

import useInput from '@hooks/useInput';

import { ComponentSocketProps } from '../../../../../typings/chat';

import * as S from './style';

const InputBox = ({ client }: ComponentSocketProps) => {
  const [chat, onChangeChat, setChat] = useInput('');

  const handleChat = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (chat.trim() !== '') {
      const isEnter = e.code === 'Enter';
      if (isEnter && !e.altKey) {
        client?.emit('chat', chat);
        setChat('');
      }
      if (isEnter && e.altKey) {
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
