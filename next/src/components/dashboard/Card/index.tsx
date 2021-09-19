import React from 'react';
import CardAnchor from './CardAnchor';
import CardButton from './CardButton';

export interface CardProps {
  title: string;
  desc: string;
  svgName: `${string}.svg`;
}

export interface CardAnchorProps extends CardProps {
  href: string;
}
export interface CardButtonProps extends CardProps {
  onClick: React.MouseEventHandler;
}

/**
 * @desc: CardAnchor는 next Link입니다.
 */
const Card = (props: CardAnchorProps | CardButtonProps) => {
  if ('href' in props) {
    return <CardAnchor {...props} />;
  }
  return <CardButton {...props} />;
};

export default Card;
