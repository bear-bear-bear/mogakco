import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { CardAnchorProps } from '.';

import * as S from './style';

const CardAnchor = ({
  href,
  svgName,
  title,
  desc,
  isShow,
}: CardAnchorProps) => (
  <Link href={href} passHref>
    <S.CardAnchor isShow={isShow}>
      <Image
        src={`/svg/${svgName}`}
        layout="intrinsic"
        width={200}
        height={200}
      />
      <h1>{title}</h1>
      <p>{desc}</p>
    </S.CardAnchor>
  </Link>
);

export default CardAnchor;
