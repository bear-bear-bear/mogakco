import React from 'react';
import Image from 'next/Image';

import * as S from './style';

interface IProps {
  title: string;
  desc: string;
  svgName: `${string}.svg`;
}

// TODO: svg 애니메이션 추가해보기
const Card = ({ title, desc, svgName }: IProps) => {
  return (
    <S.Card>
      <Image
        src={`/assets/svg/${svgName}`}
        layout="intrinsic"
        width={200}
        height={200}
      />
      <h1>{title}</h1>
      <p>{desc}</p>
    </S.Card>
  );
};

export default Card;
