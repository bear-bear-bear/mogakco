import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

const Index = ({ fill }) => {
  return (
    <S.ProgressBarWrapper>
      <S.ProgressBarFiller fill={fill} />
    </S.ProgressBarWrapper>
  );
};

Index.propTypes = {
  fill: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default Index;
