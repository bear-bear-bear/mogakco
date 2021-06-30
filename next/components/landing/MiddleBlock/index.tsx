import React from 'react';
import { Flex } from '@chakra-ui/react';
import Fade from 'react-reveal/Fade';

import * as S from './style';

interface IMiddleBlock {
  subtitle: string;
  title: string;
  content: string;
  onClickButton: () => void;
}

const MiddleBlock = ({
  subtitle,
  title,
  content,
  onClickButton,
}: IMiddleBlock) => (
  <S.MiddleBlockContainer>
    <Flex justify="center" align="center">
      <Fade bottom>
        <S.ContentWrapper>
          <h3>[ {subtitle} ]</h3>
          <h1>{title}</h1>
          <p>{content}</p>
          <S.StartButton color="blue" onClick={onClickButton}>
            시작하기
          </S.StartButton>
        </S.ContentWrapper>
      </Fade>
    </Flex>
  </S.MiddleBlockContainer>
);

export default MiddleBlock;
