import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';

import SvgImage from '~/components/common/SvgImage';

import * as S from './style';

const LeftContentBlock = ({ title, content, imgName, firstBlock }) => {
  // 임시로 작성한 state와 function
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onSubmit = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <S.LeftBlockContainer firstBlock={firstBlock}>
      <Fade bottom>
        <Row justify="center" align="middle" gutter={20}>
          <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 0 }}>
            <S.ContentWrapper firstBlock={firstBlock}>
              <h1>{title}</h1>
              <p>{content}</p>
              {firstBlock &&
                (isLoggedIn ? (
                  <S.FirstBlockStartButton color="blue" fullWidth>
                    시작하기
                  </S.FirstBlockStartButton>
                ) : (
                  <S.FirstBlockForm onSubmit={onSubmit}>
                    <S.FirstBlockInput placeholder="이메일 입력" required />
                    <S.FirstBlockJoinButton color="blue" type="submit">
                      회원가입
                    </S.FirstBlockJoinButton>
                  </S.FirstBlockForm>
                ))}
            </S.ContentWrapper>
          </Col>
          <Col xs={{ span: 16, order: 0 }} lg={{ span: 12, order: 1 }}>
            <SvgImage name={imgName} width="100%" heigth="100%" />
          </Col>
        </Row>
      </Fade>
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
