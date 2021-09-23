import type { MDEditorProps } from '@uiw/react-md-editor';

declare module '@uiw/react-md-editor' {
  export interface MDEditorCustomProps extends MDEditorProps {
    onKeyDown: React.KeyboardEventHandler<HTMLElement> | undefined;
  }
}
