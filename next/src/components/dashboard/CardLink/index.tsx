import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import * as S from './style';

interface IProps {
  href: string;
  title: string;
  desc: string;
  svgName: `${string}.svg`;
}

/**
 * @desc: CardAnchor는 next Link입니다.
 */
const CardLink = ({ href, title, desc, svgName }: IProps) => {
  return (
    <Link href={href} passHref>
      <S.CardAnchor>
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
};

export default CardLink;
