import React from 'react';

import type { ChatAnnouncement, ChatFile, ChatMessage } from 'typings/chat';
import Announcement from './Announcement';
import TextChat from './TextChat';
import FileChat from './FileChat';

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
