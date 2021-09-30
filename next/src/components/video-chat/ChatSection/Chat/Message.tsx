import React, { useCallback, useContext } from 'react';
import _ from 'lodash';
import * as linkify from 'linkifyjs';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

import useUser from '@hooks/useUser';
import type { ChatMessage } from 'typings/chat';

import { MdViewerContext } from '../ChatList';
import * as S from './style';

const Message = ({ username, message, ownerId }: ChatMessage) => {
  const { user } = useUser();
  const MdViewer = useContext(MdViewerContext);

  const getUniqueLinks = useCallback((plainText: string) => {
    const hasProtocol = (url: string) => /(?:https?:\/\/).+/.test(url);

    const linksWithProtocol = linkify
      .find(plainText)
      .filter(({ type, value }) => type === 'url' && hasProtocol(value));
    const uniqueLinks = _.uniqBy(linksWithProtocol, ({ value }) =>
      value.replace(/^www\./, ''),
    );

    return uniqueLinks.map(({ href }) => href);
  }, []);

  return (
    <S.MessageWrapper>
      <S.Writer isMyChat={ownerId === user?.id}>{username}</S.Writer>
      <MdViewer initialValue={message} extendedAutolinks />
      <ul>
        {getUniqueLinks(message).map((link) => (
          <li key={link}>
            <LinkPreview
              url={link}
              width="100%"
              imageHeight="9rem"
              margin="0 0 0.66rem 0"
              descriptionLength={100}
              primaryTextColor="#21262d"
              secondaryTextColor="#6e7681"
            />
          </li>
        ))}
      </ul>
    </S.MessageWrapper>
  );
};

export default Message;
