import React, { useCallback, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import SVGButton from './SVGButton';
import type { TuiEditorWithForwardedProps } from './TuiEditorWrapper';
import * as S from './style';

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

interface Props {
  currChat: string;
  setChat: Dispatch<SetStateAction<string>>;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  sendChat: (message: string) => void;
}

const WysiwygEditor = ({ currChat, setChat, setIsShow, sendChat }: Props) => {
  const editorEl = useRef<EditorType>();

  const getCurrentMarkdown = (): string =>
    editorEl.current?.getInstance().getMarkdown() || '';

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
        ref={editorEl}
        onChange={handleEditorChange}
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

export default WysiwygEditor;
