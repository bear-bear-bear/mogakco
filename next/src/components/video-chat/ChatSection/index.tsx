import type { Dispatch, SetStateAction } from 'react';
import { ChatProvider } from './ChatContext';
import Container from './Container';
import ChatList from './ChatList';
import InputBox from './InputBox';

export interface ChatSectionProps {
  isShowChat: boolean;
  setIsShowChat: Dispatch<SetStateAction<boolean>>;
}

const ChatSection = (props: ChatSectionProps) => {
  return (
    <ChatProvider>
      <Container {...props}>
        <ChatList />
        <InputBox />
      </Container>
    </ChatProvider>
  );
};

export default ChatSection;
