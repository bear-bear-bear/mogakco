import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';

import * as S from './style';

const MiddleBlock = ({ subtitle, title, content }) => {
  return (
    <S.MiddleBlockContainer>
      <Row justify="center" align="middle">
        <Col>
          <Fade bottom>
            <S.ContentWrapper>
              <h3>[ {subtitle} ]</h3>
              <h1>{title}</h1>
              <p>{content}</p>
              <S.StartButton color="blue">시작하기</S.StartButton>
            </S.ContentWrapper>
          </Fade>
        </Col>
      </Row>
    </S.MiddleBlockContainer>
  );
};

MiddleBlock.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default MiddleBlock;
