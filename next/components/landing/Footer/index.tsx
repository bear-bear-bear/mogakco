import React from 'react';
import Fade from 'react-reveal/Fade';
import { Flex } from '@chakra-ui/react';

import * as S from './style';

const Footer = () => {
  return (
    // TODO: 차후 컨텐츠 추가 예정
    <S.FooterContainer>
      <Flex justify="center" align="center">
        <Fade bottom>
          <S.TempText>[ 컨텐츠 추가 예정입니다 ]</S.TempText>
        </Fade>
      </Flex>
    </S.FooterContainer>
  );
};

export default Footer;
