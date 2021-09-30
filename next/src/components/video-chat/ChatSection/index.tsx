import { ChatProvider } from './ChatContext';
import Container from './Container';
import ChatList from './ChatList';
import InputBox from './InputBox';

const ChatSection = () => (
  <ChatProvider>
    <Container>
      <ChatList />
      <InputBox />
    </Container>
  </ChatProvider>
);

export default ChatSection;
