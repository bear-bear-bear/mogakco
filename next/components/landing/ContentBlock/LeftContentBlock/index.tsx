import React, { useLayoutEffect, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';
import Image from 'next/Image';

import useInput from '~/hooks/useInput';
import { saveEmail } from '~/redux/reducers/landing';
import { ILeftContentBlockProps } from '~/components/landing/ContentBlock';

import * as S from './style';

const LeftContentBlock = ({
  title,
  content,
  imgName,
  isFirstBlock,
  emailEl,
}: ILeftContentBlockProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, onChangeEmail, setEmail] = useInput('');

  useLayoutEffect(() => {
    if (!isFirstBlock) {
      return;
    }
    if (!emailEl) {
      return;
    }
    emailEl.current?.focus();
  }, [emailEl, isFirstBlock]);

  const toSignUp = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(saveEmail(email));
    router.push('/signup');
  };

  return (
    <S.LeftBlockContainer isFirstBlock={isFirstBlock}>
      <Row justify="center" align="middle" gutter={20}>
        <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 0 }}>
          <Fade left>
            <S.ContentWrapper isFirstBlock={isFirstBlock}>
              <h1>{title}</h1>
              <p>{content}</p>
              {isFirstBlock && (
                <S.FirstBlockForm onSubmit={toSignUp} spellCheck="false">
                  <S.FirstBlockInput
                    ref={emailEl}
                    type="email"
                    value={email}
                    setValue={setEmail}
                    onChange={onChangeEmail}
                    placeholder="이메일 입력"
                    spellCheck="false"
                    required
                  />
                  <S.FirstBlockJoinButton color="blue" type="submit">
                    회원가입
                  </S.FirstBlockJoinButton>
                </S.FirstBlockForm>
              )}
            </S.ContentWrapper>
          </Fade>
        </Col>
        <Col xs={{ span: 16, order: 0 }} lg={{ span: 12, order: 1 }}>
          <Fade right>
            <Image
              src={`/assets/svg/${imgName}`}
              layout="responsive"
              width={1000}
              height={700}
            />
          </Fade>
        </Col>
      </Row>
    </S.LeftBlockContainer>
  );
};

export default LeftContentBlock;
