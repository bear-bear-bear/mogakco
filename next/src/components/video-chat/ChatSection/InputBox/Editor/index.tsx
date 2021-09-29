import React, { useCallback, useContext, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import { uploadImage } from '@lib/apis';
import { logAxiosError } from '@lib/apiClient';
import SVGButton from '@components/common/SVGButton';
import type { GeneralAxiosError } from 'typings/common';

import type { TuiEditorWithForwardedProps } from './EditorWrapper';
import { ChatContext } from '../../ChatContext';
import { EditorShowContext } from '../index';
import * as S from './style';

// 210927 - toast-ui editor 3.1.0 버전(lastest) 기준 SSR 미지원으로 next/dynamic 사용
const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import('./EditorWrapper'),
  { ssr: false },
);

const EditorWithForwardedRef = React.forwardRef<
  EditorType | undefined,
  EditorProps
>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));
EditorWithForwardedRef.displayName = 'EditerWithForwardedRef';

const TuiEditor = () => {
  const chat = useContext(ChatContext);
  const [, setIsShow] = useContext(EditorShowContext);
  const editorRef = useRef<EditorType>(null);
  const [isEditorImageAddHookChanged, setIsEditorImageAddHookChanged] =
    useState<boolean>(false);

  const getCurrentMarkdown = (): string =>
    editorRef.current?.getInstance().getMarkdown() || '';

  const verifyChatLengthLimit = useCallback(() => {
    const currentMarkdown = getCurrentMarkdown();

    return {
      isLimit: currentMarkdown.length > 255,
      currentMarkdown,
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

    chat.set(currentMarkdown);
    setIsShow(false);
  };

  const handleSendButtonClick = () => {
    const { isLimit, currentMarkdown } = verifyChatLengthLimit();

    if (isLimit) {
      // TODO: 모달로 바꾸기
      alert('채팅 길이 상한을 넘었습니다 (255)');
      return;
    }

    chat.send(currentMarkdown);
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
        initialValue={chat.get()}
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
