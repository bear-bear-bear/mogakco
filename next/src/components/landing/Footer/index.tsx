import React from 'react';
import Fade from 'react-reveal/Fade';

import * as S from './style';

const Footer = () => {
  return (
    // TODO: 차후 컨텐츠 추가 예정
    <S.Container>
      <Fade bottom>
        <S.TempText>[ 컨텐츠 추가 예정입니다 ]</S.TempText>
      </Fade>
    </S.Container>
  );
};

export default Footer;
