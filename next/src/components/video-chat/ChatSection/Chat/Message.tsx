import React, { useCallback, useContext, useMemo } from 'react';
import _ from 'lodash';
import * as linkify from 'linkifyjs';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import type { AutolinkParser } from '@toast-ui/editor/types/editor';

import useUser from '@hooks/useUser';
import type { ChatMessage } from 'typings/chat';

import { MdViewerContext } from '../ChatList';
import * as S from './style';

const Message = ({ username, message, ownerId }: ChatMessage) => {
  const { user } = useUser();
  const MdViewer = useContext(MdViewerContext);

  /**
   * @desc
   * []() 형식의 마크다운 링크에서 () 안에 들어가는 링크에 프로토콜이 붙어있지 않을 때,
   * toast-ui 뷰어가 이를 그대로 href 속성에 집어넣음. 그렇게 되면 링크 클릭 시 '현재 도메인 + href에 적힌 주소' 로 가게 되는데,
   * 이를 방지하기 위해 현재 메세지 내 프로토콜이 붙어있지 않은 마크다운 링크에 대해 'http://' 를 삽입해줌.
   */
  const mdLinkUpdatedMessage = useMemo(() => {
    const links = linkify.find(message).filter(({ type }) => type === 'url');
    if (links.length === 0) return message;

    const hasProtocol = (url: string) => /(?:https?:\/\/).+/.test(url);
    const linksWithoutProtocol = links.filter(
      ({ value }) => !hasProtocol(value),
    );
    if (linksWithoutProtocol.length === 0) return message;

    return linksWithoutProtocol.reduce((acc, { start }) => {
      const isMarkdownLink = message.substring(start - 2, start) === '](';
      if (isMarkdownLink) {
        return `${acc.slice(0, start)}http://${acc.slice(start)}`;
      }
      return acc;
    }, message);
  }, [message]);

  const links = useMemo(
    () =>
      linkify.find(mdLinkUpdatedMessage).filter(({ type }) => type === 'url'),
    [mdLinkUpdatedMessage],
  );

  /**
   * @desc
   * toast-ui 뷰어의 링크 자동변환 기능에 대한 커스텀 parser
   * http:// 추가를 지원해줌
   */
  const autoLinkParser: AutolinkParser = useCallback((content) => {
    return linkify.find(content).map(({ href, value, start, end }) => ({
      url: href,
      text: value,
      range: [start, end],
    }));
  }, []);

  const getUniqueLinks = useCallback(() => {
    const uniqueLinks = _.uniqBy(links, ({ value }) =>
      value.replace(/(^https?:\/\/(?:www\.)?|^www\.)/, ''),
    );

    return uniqueLinks.map(({ href }) => href);
  }, [links]);

  return (
    <S.MessageWrapper>
      <S.Writer isMyChat={ownerId === user?.id}>{username}</S.Writer>
      <MdViewer
        initialValue={mdLinkUpdatedMessage}
        extendedAutolinks={autoLinkParser}
      />
      <ul>
        {getUniqueLinks().map((link) => (
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

export default React.memo(Message);
