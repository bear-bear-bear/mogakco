import React from 'react';

import * as S from './style';

export interface ProgressBarProps {
  fill: number;
}

const ProgressBar = ({ fill }: ProgressBarProps) => {
  return (
    <S.ProgressBarWrapper>
      <S.ProgressBarFiller fill={fill} />
    </S.ProgressBarWrapper>
  );
};

export default ProgressBar;
