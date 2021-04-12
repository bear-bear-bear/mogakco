import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Row, Col } from 'antd';

import Button from '~/components/common/Button';

import * as S from './style';

// TODO: S.ButtonsWrapper 컴포넌트로 분리 (Btns)
// TODO: 위 컴포넌트 작은 모니터에서 버거로 변경

const Header = () => {
  // 임시로 작성한 state와 function
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onClick = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <S.LandingHeader>
      <Row justify="space-between">
        <Col flex="fit-content">
          <S.MainLogo />
        </Col>
        <Col flex="auto">
          {isLoggedIn ? (
            <S.ButtonsWrapper>
              <Button color="blue">시작하기</Button>
            </S.ButtonsWrapper>
          ) : (
            <S.ButtonsWrapper>
              <Button color="black" underline onClick={onClick}>
                로그인
              </Button>
              <Link href="/signup">
                <Button color="black" underline>
                  회원가입
                </Button>
              </Link>
            </S.ButtonsWrapper>
          )}
        </Col>
      </Row>
    </S.LandingHeader>
  );
};

export default Header;
