import React from 'react';

import type { ChatAnnouncement, ChatMessage } from 'typings/chat';
import Announcement from './Announcement';
import Message from './Message';

const Chat = (schema: ChatAnnouncement | ChatMessage) => {
  if ('ownerId' in schema) {
    return <Message {...schema} />;
  }
  return <Announcement {...schema} />;
};

export default Chat;
