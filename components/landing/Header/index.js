import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Row, Col } from 'antd';

import { meSelector } from '~/redux/selectors/common/user';
import Button from '~/components/common/Button';

import * as S from './style';

// TODO: 로그인/로그아웃 컴포넌트 작은 모니터에서 버거로 변경

const Header = () => {
  const me = useSelector(meSelector);

  return (
    <S.HeaderContainer>
      <Row justify="space-between">
        <Col flex="fit-content">
          <S.MainLogo />
        </Col>
        <Col flex="auto">
          {me ? (
            <S.ButtonsWrapper>
              <Link href="/">
                <S.UserIcon />
              </Link>
            </S.ButtonsWrapper>
          ) : (
            <S.ButtonsWrapper>
              <Link href="/login">
                <Button color="black" underline>
                  로그인
                </Button>
              </Link>
              <Link href="/signUp">
                <Button color="black" underline>
                  회원가입
                </Button>
              </Link>
            </S.ButtonsWrapper>
          )}
        </Col>
      </Row>
    </S.HeaderContainer>
  );
};

export default Header;
