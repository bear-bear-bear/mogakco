import React from 'react';

import MyTextChat from '@components/video-chat/ChatSection/Chat/MyTextChat';
import useUser from '@hooks/useUser';
import Announcement from './Announcement';
import TextChat from './TextChat';
import FileChat from './FileChat';
import {
  ChatAnnouncement,
  ChatFile,
  ChatMessage,
} from '../../../../../typings/chat';

const Chat = (schema: ChatAnnouncement | ChatMessage | ChatFile) => {
  const { user } = useUser();

  switch (schema.type) {
    case 'chat': {
      const { username, message, ownerId } = schema;
      if (ownerId === user?.id) {
        return <MyTextChat nickname={username} content={message} />;
      }
      return <TextChat nickname={username} content={message} />;
    }
    case 'file': {
      const { username, info } = schema;
      return <FileChat nickname={username} content={info} />;
    }
    default: {
      return <Announcement {...schema} />;
    }
  }
};

export default Chat;
