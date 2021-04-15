import React from 'react';
import { Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';

import * as S from './style';

const Footer = () => {
  return (
    // TODO: 차후 컨텐츠 추가 예정
    <S.FooterContainer>
      <Fade bottom>
        <Row justify="center" align="stretch">
          <Col />
        </Row>
      </Fade>
    </S.FooterContainer>
  );
};

export default Footer;
