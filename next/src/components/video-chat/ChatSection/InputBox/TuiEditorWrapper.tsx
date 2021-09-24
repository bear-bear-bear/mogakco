import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';

export interface TuiEditorWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

export default function TuiEditorWrapper(props: TuiEditorWithForwardedProps) {
  const { forwardedRef } = props;

  return <Editor {...props} ref={forwardedRef} />;
}
