import React from 'react';
import { Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';

import Image from 'next/Image';
import { IRightContentBlockProps } from '~/components/landing/ContentBlock';

import * as S from './style';

const RightContentBlock = ({
  title,
  content,
  imgName,
}: IRightContentBlockProps) => {
  return (
    <S.RightBlockContainer>
      <Row justify="center" align="middle" gutter={20}>
        <Col xs={{ span: 16 }} lg={{ span: 12 }}>
          <Fade left>
            <Image
              src={`/assets/svg/${imgName}`}
              layout="responsive"
              width={1000}
              height={700}
            />
          </Fade>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Fade right>
            <S.ContentWrapper>
              <h1>{title}</h1>
              <p>{content}</p>
            </S.ContentWrapper>
          </Fade>
        </Col>
      </Row>
    </S.RightBlockContainer>
  );
};

export default RightContentBlock;
