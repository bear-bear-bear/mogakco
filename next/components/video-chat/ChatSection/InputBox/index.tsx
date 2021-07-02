import React, { KeyboardEvent, useRef } from 'react';
import useInput from '@hooks/useInput';
import log from 'loglevel';
import { socketServer } from '@pages/chat/[id]';
import * as S from './style';

log.setLevel('DEBUG');

const resize = (ref?: HTMLTextAreaElement): void => {
  if (ref) {
    ref.style.height = '1px';
    ref.style.height = `${12 + ref.scrollHeight}px`;
  }
};

const InputBox = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const handleChat = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (chat.trim() !== '') {
      if (e.code === 'Enter' && !e.altKey) {
        resize(textAreaRef.current);
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
