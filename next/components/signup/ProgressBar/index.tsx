import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

export interface ProgressBarProps {
  fill: boolean[];
}

const ProgressBar = ({ fill }: ProgressBarProps) => {
  return (
    <S.ProgressBarWrapper>
      <S.ProgressBarFiller fill={fill} />
    </S.ProgressBarWrapper>
  );
};

ProgressBar.propTypes = {
  fill: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default ProgressBar;
