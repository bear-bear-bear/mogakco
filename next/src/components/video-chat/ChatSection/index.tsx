import type { Dispatch, SetStateAction } from 'react';
import Container from './Container';
import ChatList from './ChatList';
import InputBox from './InputBox';

export interface ChatSectionProps {
  isShowChat: boolean;
  setIsShowChat: Dispatch<SetStateAction<boolean>>;
}

const ChatSection = (props: ChatSectionProps) => {
  return (
    <Container {...props}>
      <ChatList />
      <InputBox />
    </Container>
  );
};

export default ChatSection;
