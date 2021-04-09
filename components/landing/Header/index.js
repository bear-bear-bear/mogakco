import React from 'react';
import Link from 'next/link';
import { Row, Col } from 'antd';

import * as S from './style';

// TODO: S.ButtonsWrapper 컴포넌트로 분리 (Btns)
// TODO: 위 컴포넌트 작은 모니터에서 버거로 변경

const Header = ({ isLoggedIn }) => {
  return (
    <S.LandingHeader>
      <Row justify="space-between">
        <Col flex="fit-content">
          <S.MainLogo />
        </Col>
        <Col flex="auto">
          {isLoggedIn ? (
            <S.ButtonsWrapper>
              <S.StartButton>시작하기</S.StartButton>
            </S.ButtonsWrapper>
          ) : (
            <S.ButtonsWrapper>
              <S.AuthButton>로그인</S.AuthButton>
              <Link href="/signup">
                <S.AuthButton>회원가입</S.AuthButton>
              </Link>
            </S.ButtonsWrapper>
          )}
        </Col>
      </Row>
    </S.LandingHeader>
  );
};

export default Header;
