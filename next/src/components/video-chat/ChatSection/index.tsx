import { createContext, Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';

import Container from './Container';
import ChatList from './ChatList';
import InputBox from './InputBox';

export interface ChatSectionProps {
  isShowChat: boolean;
  setIsShowChat: Dispatch<SetStateAction<boolean>>;
}

const MDPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});
export const MDPreviewContext = createContext(MDPreview);

const ChatSection = (props: ChatSectionProps) => {
  return (
    <MDPreviewContext.Provider value={MDPreview}>
      <Container {...props}>
        <ChatList />
        <InputBox />
      </Container>
    </MDPreviewContext.Provider>
  );
};

export default ChatSection;
