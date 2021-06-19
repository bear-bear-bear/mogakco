import React, { FC, ReactElement } from 'react';
import { useRouter } from 'next/router';
import Image from '~/components/common/Image';

import * as S from './style';

interface IProps {
  progressBar: ReactElement;
}

const AuthContainer: FC<IProps> = ({
  progressBar = null,
  children,
  ...rest
}) => {
  const router = useRouter();

  const onClickLogo = () => {
    router.push('/');
  };

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

export default AuthContainer;
