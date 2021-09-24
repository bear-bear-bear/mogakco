import React, { useContext, useEffect, useRef } from 'react';
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
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

const WysiwygEditor = ({ setIsShow }: Props) => {
  const client = useContext(SocketContext);
  const editorRef = useRef<EditorType>();

  // const handleChange = React.useCallback(() => {
  //   console.log();
  // }, [editorRef]);

  const handleCloseButtonClick = () => {
    // ... 텍스트 이전하는 로직
    setIsShow(false);
  };

  return (
    <S.EditorBackground>
      <EditorWithForwardedRef height="600px" ref={editorRef} />
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
