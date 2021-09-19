import React from 'react';
import Image from 'next/image';

import type { CardButtonProps } from '.';

import * as S from './style';

const CardAnchor = ({ svgName, title, desc, onClick }: CardButtonProps) => (
  <S.CardButton onClick={onClick}>
    <Image
      src={`/svg/${svgName}`}
      layout="intrinsic"
      width={200}
      height={200}
    />
    <h1>{title}</h1>
    <p>{desc}</p>
  </S.CardButton>
);

export default CardAnchor;
