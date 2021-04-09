import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBarWrapper, ProgressBarFiller } from './style';

const Index = ({ fill }) => {
  return (
    <ProgressBarWrapper>
      <ProgressBarFiller fill={fill} />
    </ProgressBarWrapper>
  );
};

export default Index;

Index.propTypes = {
  fill: PropTypes.arrayOf('boolean').isRequired,
};
