import Container from './Container';
import ChatList from './ChatList';
import InputBox from './InputBox';
import { ComponentSocketProps } from '../../../../typings/chat';

const ChatSection = ({ client }: ComponentSocketProps) => {
  return (
    <Container client={client}>
      <ChatList client={client} />
      <InputBox client={client} />
    </Container>
  );
};

export default ChatSection;
