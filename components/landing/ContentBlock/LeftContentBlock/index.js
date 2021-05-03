import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';

import { meSelector } from '~/redux/selectors/common/user';
import Image from '~/components/common/Image';

import * as S from './style';

const LeftContentBlock = ({ title, content, imgName, firstBlock }) => {
  // 임시로 작성한 state와 function
  const me = useSelector(meSelector);

  const onSubmit = useCallback((e) => {
    // TODO: 현재 이메일 입력 값을 회원가입 첫 페이지 이메일 입력창으로 전달
    e.preventDefault();
    Router.push('/signup');
  }, []);

  return (
    <S.LeftBlockContainer firstBlock={firstBlock}>
      <Row justify="center" align="middle" gutter={20}>
        <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 0 }}>
          <Fade left>
            <S.ContentWrapper firstBlock={firstBlock}>
              <h1>{title}</h1>
              <p>{content}</p>
              {firstBlock &&
                (me ? (
                  <S.FirstBlockStartButton color="blue" fullWidth>
                    시작하기
                  </S.FirstBlockStartButton>
                ) : (
                  <S.FirstBlockForm onSubmit={onSubmit} spellcheck="false">
                    <S.FirstBlockInput
                      type="email"
                      placeholder="이메일 입력"
                      spellCheck="false"
                      required
                    />
                    <S.FirstBlockJoinButton color="blue" type="submit">
                      회원가입
                    </S.FirstBlockJoinButton>
                  </S.FirstBlockForm>
                ))}
            </S.ContentWrapper>
          </Fade>
        </Col>
        <Col xs={{ span: 16, order: 0 }} lg={{ span: 12, order: 1 }}>
          <Fade right>
            <Image name={imgName} width="100%" heigth="100%" />
          </Fade>
        </Col>
      </Row>
    </S.LeftBlockContainer>
  );
};

LeftContentBlock.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imgName: PropTypes.string.isRequired,
  firstBlock: PropTypes.bool,
};
LeftContentBlock.defaultProps = {
  firstBlock: false,
};

export default LeftContentBlock;
