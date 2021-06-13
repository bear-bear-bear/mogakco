import React from 'react';
import { Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';

import * as S from './style';

const Footer = () => {
  return (
    // TODO: 차후 컨텐츠 추가 예정
    <S.FooterContainer>
      <Row justify="center" align="middle">
        <Col>
          <Fade bottom>
            <S.TempText>[ 컨텐츠 추가 예정입니다 ]</S.TempText>
          </Fade>
        </Col>
      </Row>
    </S.FooterContainer>
  );
};

export default Footer;
