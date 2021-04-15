import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import * as S from './style';

const MiddleBlock = ({ subtitle, title, content }) => {
  return (
    <S.MiddleBlockContainer>
      <Row justify="center" align="middle">
        <Col>
          <S.ContentWrapper>
            <h3>[ {subtitle} ]</h3>
            <h1>{title}</h1>
            <p>{content}</p>
            <S.StartButton color="blue">시작하기</S.StartButton>
          </S.ContentWrapper>
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
