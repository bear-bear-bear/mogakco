import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

const Desc = ({ size, children, ...rest }) => (
  <S.Desc size={size} {...rest}>
    {children}
  </S.Desc>
);

Desc.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
};
Desc.defaultProps = {
  size: 'medium',
};

export default Desc;
