import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';

import Image from '~/components/common/Image';

import * as S from './style';

const RightContentBlock = ({ title, content, imgName }) => {
  return (
    <S.RightBlockContainer>
      <Fade bottom>
        <Row justify="center" align="middle" gutter={20}>
          <Col xs={{ span: 16 }} lg={{ span: 12 }}>
            <Image name={imgName} width="100%" heigth="100%" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <S.ContentWrapper>
              <h1>{title}</h1>
              <p>{content}</p>
            </S.ContentWrapper>
          </Col>
        </Row>
      </Fade>
    </S.RightBlockContainer>
  );
};

RightContentBlock.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imgName: PropTypes.string.isRequired,
};

export default RightContentBlock;
