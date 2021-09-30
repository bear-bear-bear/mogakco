import React, { useCallback, useContext } from 'react';
import type { KeyboardEvent } from 'react';

import { ChatContext } from '../../ChatContext';
import * as S from './style';

const ImageUploadableTextArea = () => {
  const chat = useContext(ChatContext);

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
    <S.TextArea
      value={chat.get()}
      onKeyDown={handleEnterKeyDown}
      onChange={chat.onChange}
      maxLength={255}
      placeholder="여기에 메세지 입력..."
    />
  );
};

export default ImageUploadableTextArea;
