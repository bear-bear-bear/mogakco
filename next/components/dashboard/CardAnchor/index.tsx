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
 * @returns: next/Link에 바로 넣을 수 있도록 a태그로 감싸 리턴합니다.
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
