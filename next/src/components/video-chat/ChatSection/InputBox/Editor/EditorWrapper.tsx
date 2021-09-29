import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';

export interface TuiEditorWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

/**
 * @desc
 * SSR을 지원하지 않는 toast-ui Editor 를 사용하기 위해 next/dynamic을 쓰는데,
 * next/dynamic 을 사용하면 ref가 제대로 전달되지 않기 때문에 이를 해결해줄 forwardedRef wrapper 컴포넌트.
 */
export default function TuiEditorWrapper(props: TuiEditorWithForwardedProps) {
  const { forwardedRef } = props;

  return <Editor {...props} ref={forwardedRef} />;
}
