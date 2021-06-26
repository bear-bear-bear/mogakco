import React from 'react';

import Announcement from './Announcement';
import TextChat from './TextChat';
import FileChat from './FileChat';

const Chat = ({ nickname, content, type }: any) => {
  switch (type) {
    case 'chat':
      return <TextChat nickname={nickname} content={content} />;
    case 'file':
      return <FileChat nickname={nickname} content={content} />;
    default:
      return <Announcement type={type} nickname={nickname} />;
  }
};

export default Chat;
