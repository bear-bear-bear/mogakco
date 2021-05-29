import React, { useCallback } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

import Image from '~/components/common/Image';

import * as S from './style';

const AuthContainer = ({ progressBar, children, ...rest }) => {
  const onClickLogo = useCallback(() => {
    Router.push('/');
  }, []);

  return (
    <S.OuterContainer {...rest}>
      <S.Header>
        <S.LogoWrapper onClick={onClickLogo}>
          <Image name="logo.svg" />
        </S.LogoWrapper>
      </S.Header>
      {progressBar}
      <S.InnerContainer>{children}</S.InnerContainer>
    </S.OuterContainer>
  );
};

AuthContainer.propTypes = {
  progressBar: PropTypes.element,
};
AuthContainer.defaultProps = {
  progressBar: null,
};

export default AuthContainer;
