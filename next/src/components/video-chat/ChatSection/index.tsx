import { Socket } from 'socket.io-client';
import Container from './Container';
import ChatList from './ChatList';
import InputBox from './InputBox';

const ChatSection = ({ client }: { client: Socket | null }) => {
  return (
    <Container client={client}>
      <ChatList client={client} />
      <InputBox client={client} />
    </Container>
  );
};

export default ChatSection;
