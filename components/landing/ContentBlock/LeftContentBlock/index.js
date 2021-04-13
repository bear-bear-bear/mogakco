import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import SvgImage from '~/components/common/SvgImage';

import * as S from './style';

const LeftContentBlock = ({ title, subtitle, imgName, isFirstBlock }) => {
  // 임시로 작성한 state와 function
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onSubmit = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <S.LeftBlockContainer>
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={12}>
          <S.ContentWrapper isFirstBlock={isFirstBlock}>
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
            {isFirstBlock && isLoggedIn ? (
              <S.StartButton color="blue" fullWidth>
                시작하기
              </S.StartButton>
            ) : (
              <S.Form onSubmit={onSubmit}>
                <S.Input placeholder="이메일 입력" required />
                <S.JoinButton color="blue" type="submit">
                  회원가입
                </S.JoinButton>
              </S.Form>
            )}
          </S.ContentWrapper>
        </Col>
        <Col xs={24} sm={12}>
          <SvgImage name={imgName} width="100%" heigth="100%" />
        </Col>
      </Row>
    </S.LeftBlockContainer>
  );
};

LeftContentBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imgName: PropTypes.string.isRequired,
  isFirstBlock: PropTypes.bool,
};
LeftContentBlock.defaultProps = {
  isFirstBlock: false,
};

export default LeftContentBlock;
