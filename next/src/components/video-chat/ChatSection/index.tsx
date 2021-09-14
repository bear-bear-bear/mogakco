import Container from './Container';
import ChatList from './ChatList';
import InputBox from './InputBox';

const ChatSection = () => {
  return (
    <Container>
      <ChatList />
      <InputBox />
    </Container>
  );
};

export default ChatSection;
