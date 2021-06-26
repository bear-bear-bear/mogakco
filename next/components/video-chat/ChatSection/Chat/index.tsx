import React from 'react';
import * as S from './style';

interface IFileContentProps {
  // [fileInfo: string]: string;
  filename: string;
  size: string;
  url: string;
}
export interface IChatProps {
  key?: number;
  id: number;
  name: string;
  content?: string | IFileContentProps;
  type: 'chat' | 'file' | 'enter' | 'exit' | 'kick';
}

const Chat = (props: IChatProps) => {
  const announce = (type: string, name: string) => {
    const explains: { [announceType: string]: string } = {
      enter: '입장하셨습니다.',
      exit: '퇴장하셨습니다.',
      kick: '강제퇴장 되었습니다.',
    };
    return `${name} 님이 ${explains[type]}`;
  };

  switch (props.type) {
    case 'chat':
      return (
        <S.ChatWrapper>
          <p>{props.name}</p>
          <p>{props.content}</p>
        </S.ChatWrapper>
      );
    case 'file': {
      const { filename, size, url } = props.content as IFileContentProps;
      return (
        <S.ChatWrapper>
          <p>{props.name}</p>
          <a href={url}>
            <p>{filename}</p>
            <p>{size}</p>
          </a>
        </S.ChatWrapper>
      );
    }
    default:
      return (
        <S.ChatWrapper>
          <S.Announcement>{announce(props.type, props.name)}</S.Announcement>
        </S.ChatWrapper>
      );
  }
};

export default Chat;
