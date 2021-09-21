import React from 'react';

import Announcement from './Announcement';
import TextChat from './TextChat';
import FileChat from './FileChat';
import {
  ChatAnnouncement,
  ChatFile,
  ChatMessage,
} from '../../../../../typings/chat';

const Chat = (schema: ChatAnnouncement | ChatMessage | ChatFile) => {
  switch (schema.type) {
    case 'chat':
      return <TextChat {...schema} />;
    case 'file':
      return <FileChat {...schema} />;
    default:
      return <Announcement {...schema} />;
  }
};

export default Chat;
