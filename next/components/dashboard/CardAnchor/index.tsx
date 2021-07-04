import React from 'react';
import Image from 'next/Image';

import * as S from './style';

interface IProps {
  title: string;
  desc: string;
  svgName: `${string}.svg`;
}

// TODO: svg 애니메이션 추가해보기
/**
 * @returns: CardAnchor는 html <a> 엘리먼트입니다, next/link에 바로 넣어줄 수 있습니다.
 */
const CardAnchor = ({ title, desc, svgName }: IProps) => {
  return (
    <S.CardAnchor>
      <Image
        src={`/assets/svg/${svgName}`}
        layout="intrinsic"
        width={200}
        height={200}
      />
      <h1>{title}</h1>
      <p>{desc}</p>
    </S.CardAnchor>
  );
};

export default CardAnchor;
