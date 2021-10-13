import React from 'react';
import Fade from 'react-reveal/Fade';

import Image from 'next/image';
import type { IRightContentBlockProps } from '@components/landing/ContentBlock';

import * as S from './style';

const RightContentBlock = ({
  title,
  content,
  imgName,
}: IRightContentBlockProps) => {
  return (
    <S.Container>
      <S.ImageWrapper>
        <Fade left>
          <Image
            src={`/svg/${imgName}`}
            layout="responsive"
            width={1000}
            height={700}
          />
        </Fade>
      </S.ImageWrapper>
      <S.ContentWrapper>
        <Fade right>
          <section>
            <h1>{title}</h1>
            <p>{content}</p>
          </section>
        </Fade>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default RightContentBlock;
