import { ReactNode } from 'react';
import * as S from './style';

interface IContainerProps {
  children?: ReactNode;
}

/**
 * @desc `grid-template` 를 사용합니다.
 * @params children - `grid-area: main`, `grid-area: aside` 을 가진 2개의 자식이 필요합니다.
 */
const Container = ({ children }: IContainerProps) => {
  return <S.Container>{children}</S.Container>;
};

export default Container;
