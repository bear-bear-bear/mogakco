import React from 'react';

import MyTextChat from '@components/video-chat/ChatSection/Chat/MyTextChat';
import Announcement from './Announcement';
import TextChat from './TextChat';
import FileChat from './FileChat';

const Chat = ({ username, message, type }: any) => {
  switch (type) {
    case 'chat':
      return <TextChat nickname={username} content={message} />;
    case 'my-chat':
      return <MyTextChat nickname={username} content={message} />;
    case 'file':
      return <FileChat nickname={username} content={message} />;
    default:
      return <Announcement type={type} nickname={username} />;
  }
};

export default Chat;
