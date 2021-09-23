import React, { KeyboardEvent, useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { MDEditorCustomProps } from '@uiw/react-md-editor';

// https://github.com/uiwjs/react-md-editor/issues/52#issuecomment-848969341
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// https://github.com/uiwjs/react-md-editor/issues/224#issuecomment-925673338
import {
  bold,
  italic,
  divider,
  link,
  quote,
  code,
  image,
  unorderedListCommand,
  group,
} from '@uiw/react-md-editor/lib/commands';
import type {
  TextState,
  TextAreaTextApi,
} from '@uiw/react-md-editor/lib/commands';

import UploadSVG from '@public/svg/upload.svg';
import { SocketContext } from '@pages/video-chat/[id]';

import * as S from './style';

const MDEditor = dynamic<MDEditorCustomProps>(
  () => import('@uiw/react-md-editor'),
  {
    ssr: false,
  },
);

const InputBox = () => {
  const [chat, setChat] = useState<string | undefined>('');
  const client = useContext(SocketContext);

  const sendChat = () => {
    if (!client) return;

    const clearedChat = chat?.trim();
    if (!clearedChat) return;

    client.emit('chat', clearedChat);
    setChat('');
  };

  const handleEnterKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return; // Not e.code (except composing)
    e.preventDefault();

    if (e.altKey) {
      setChat((prev) => `${prev}\n`);
      return;
    }

    sendChat();
  };

  return (
    <S.InputBox>
      <MDEditor
        value={chat}
        onChange={setChat}
        onKeyDown={handleEnterKeyDown}
        preview="edit"
        commands={[
          bold,
          italic,
          divider,
          link,
          quote,
          code,
          image,
          divider,
          unorderedListCommand,
          divider,
          group([], {
            name: 'upload',
            icon: UploadSVG(),
            execute: (state: TextState, api: TextAreaTextApi) => {
              alert('업로드 미구현');
            },
            buttonProps: {
              title: 'Upload files',
              'aria-label': 'Upload files',
            },
          }),
        ]}
      />
    </S.InputBox>
  );
};

export default InputBox;
