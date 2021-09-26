import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import { uploadImage } from '@lib/apis';
import { logAxiosError } from '@lib/apiClient';
import { GeneralAxiosError } from 'typings/common';
import SVGButton from './SVGButton';
import type { TuiEditorWithForwardedProps } from './TuiEditorWrapper';
import * as S from './style';

// 210927 - toast-ui editor 3.1.0 버전(lastest) 기준 SSR 미지원으로 next/dynamic 사용
const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import('./TuiEditorWrapper'),
  { ssr: false },
);

const EditorWithForwardedRef = React.forwardRef<
  EditorType | undefined,
  EditorProps
>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));
EditorWithForwardedRef.displayName = 'EditerWithForwardedRef';

interface TuiEditorProps {
  currChat: string;
  setChat: Dispatch<SetStateAction<string>>;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  sendChat: (message: string) => void;
}

const TuiEditor = ({
  currChat,
  setChat,
  setIsShow,
  sendChat,
}: TuiEditorProps) => {
  const editorRef = useRef<EditorType>(null);
  const [isEditorImageAddHookChanged, setIsEditorImageAddHookChanged] =
    useState<boolean>(false);

  const getCurrentMarkdown = (): string =>
    editorRef.current?.getInstance().getMarkdown() || '';

  const verifyChatLengthLimit = useCallback(() => {
    const currentMarkdown = getCurrentMarkdown();

    return {
      isLimit: currentMarkdown.length > 255,
      currChat: currentMarkdown,
    };
  }, []);

  const handleEditorChange = () => {
    if (verifyChatLengthLimit().isLimit) {
      // TODO: 모달로 바꾸기
      alert('채팅 길이 상한을 넘었습니다 (255)');
    }
  };

  const handleCloseButtonClick = () => {
    const currentMarkdown = getCurrentMarkdown();

    setChat(currentMarkdown);
    setIsShow(false);
  };

  const handleSendButtonClick = () => {
    const { isLimit, currChat: chat } = verifyChatLengthLimit();

    if (isLimit) {
      // TODO: 모달로 바꾸기
      alert('채팅 길이 상한을 넘었습니다 (255)');
      return;
    }

    sendChat(chat);
    setIsShow(false);
  };

  const changeEditorImageAddHook = useCallback(() => {
    // autofocus + onFocus: 에디터 렌더링 시 최소 1회는 무조건 실행
    // isEditorImageAddHookChanged: 실행횟수 1회 제한
    if (isEditorImageAddHookChanged) return;
    if (!editorRef.current) return;

    const editorEl = editorRef.current;

    editorEl.getInstance().removeHook('addImageBlobHook');
    editorEl.getInstance().addHook('addImageBlobHook', (blob, callback) => {
      (async () => {
        try {
          const formData = new FormData();
          formData.append('image', blob);
          const { url } = await uploadImage(formData);

          callback(url, 'image');
        } catch (err) {
          logAxiosError(err as GeneralAxiosError);
        }
      })();

      return false;
    });

    setIsEditorImageAddHookChanged(true);
  }, [isEditorImageAddHookChanged]);

  return (
    <S.EditorBackground>
      <SVGButton
        SvgComponent={S.EditorCloseButton}
        buttonProps={{
          title: '에디터 닫기',
          'aria-label': 'Close markdown editor',
        }}
        onClick={handleCloseButtonClick}
      />
      <EditorWithForwardedRef
        initialValue={currChat}
        height="600px"
        ref={editorRef}
        onChange={handleEditorChange}
        onFocus={changeEditorImageAddHook}
        autofocus
      />
      <S.SendButton
        color="white"
        scale="large"
        outline
        onClick={handleSendButtonClick}
      >
        Send
      </S.SendButton>
    </S.EditorBackground>
  );
};

export default TuiEditor;
