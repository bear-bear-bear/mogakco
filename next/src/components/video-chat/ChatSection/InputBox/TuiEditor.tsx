import React, { useCallback, useContext, useEffect, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import { SocketContext } from '@pages/video-chat/[id]';

import type { TuiEditorWithForwardedProps } from './TuiEditorWrapper';
import * as S from './style';
import SVGButton from './SVGButton';

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
}

const WysiwygEditor = ({ currChat, setChat, setIsShow }: Props) => {
  const client = useContext(SocketContext);
  const editorRef = useRef<EditorType>();

  const getCurrentMarkdown = (): string =>
    editorRef.current?.getInstance().getMarkdown() || '';

  const handleChange = useCallback(() => {
    const currentMarkdown = getCurrentMarkdown();

    if (currentMarkdown.length > 255) {
      alert('채팅 입력 제한 수 초과');
    }
  }, []);

  const handleCloseButtonClick = () => {
    const currentMarkdown = getCurrentMarkdown();

    setChat(currentMarkdown);
    setIsShow(false);
  };

  return (
    <S.EditorBackground>
      <EditorWithForwardedRef
        initialValue={currChat}
        height="600px"
        ref={editorRef}
        onChange={handleChange}
      />
      <SVGButton
        SvgComponent={S.EditorCloseButton}
        buttonProps={{
          title: '에디터 닫기',
          'aria-label': 'Close markdown editor',
        }}
        onClick={handleCloseButtonClick}
      />
    </S.EditorBackground>
  );
};

export default WysiwygEditor;
