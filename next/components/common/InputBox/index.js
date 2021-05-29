import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

/**
 * @desc text, password 등 입력창을 갖는 input의 공통 사이즈를 정의합니다.
 */
const InputBox = React.forwardRef(({ children, size, ...rest }, ref) => (
  <S.InputBox ref={ref} size={size} {...rest}>
    {children}
  </S.InputBox>
));

InputBox.displayName = 'InputBox';
InputBox.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
};
InputBox.defaultProps = {
  size: 'medium',
};

export default InputBox;
