import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';

import useInput from '~/hooks/useInput';
import { saveEmail } from '~/redux/reducers/landing';
import { meSelector } from '~/redux/selectors/common/user';
import Image from '~/components/common/Image';

import * as S from './style';

const LeftContentBlock = ({ title, content, imgName, firstBlock, emailEl }) => {
  const dispatch = useDispatch();
  const me = useSelector(meSelector);
  const [email, onChangeEmail] = useInput('');

  useEffect(() => {
    if (!firstBlock) return;
    emailEl.current.focus();
  }, [emailEl, firstBlock]);

  const toSignUp = (e) => {
    e.preventDefault();
    dispatch(saveEmail(email));
    Router.push('/signup');
  };

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
                  <S.FirstBlockForm onSubmit={toSignUp} spellcheck="false">
                    <S.FirstBlockInput
                      ref={emailEl}
                      type="email"
                      value={email}
                      onChange={onChangeEmail}
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
  emailEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]), // emailEl = React.useRef()
};
LeftContentBlock.defaultProps = {
  firstBlock: false,
  emailEl: null,
};

export default LeftContentBlock;
