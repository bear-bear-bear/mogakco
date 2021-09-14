import React, { MutableRefObject } from 'react';
import LeftContentBlock from './LeftContentBlock';
import RightContentBlock from './RightContentBlock';

interface IContentBlockProps {
  type: 'left' | 'right';
  title: string;
  content: string;
  imgName: string;
  isFirstBlock?: boolean;
  emailEl?: MutableRefObject<HTMLInputElement | null>;
}

export type ILeftContentBlockProps = Omit<IContentBlockProps, 'type'>;
export type IRightContentBlockProps = Omit<
  IContentBlockProps,
  'type' | 'isFirstBlock' | 'emailEl'
>;

const ContentBlock = ({ type, ...restProps }: IContentBlockProps) => {
  if (type === 'left') return <LeftContentBlock {...restProps} />;
  if (type === 'right') return <RightContentBlock {...restProps} />;
  return null;
};

export default ContentBlock;
