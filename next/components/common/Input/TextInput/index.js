import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

/**
 * @desc text, password 등 입력창을 갖는 input의 공통 사이즈를 정의합니다.
 * password는 이 컴포넌트를 확장하여 작성된 common/PasswordInput이 있습니다.
 */
const Text = React.forwardRef(({ size, ...rest }, ref) => (
  <S.Text ref={ref} size={size} {...rest} />
));

Text.displayName = 'Text';
Text.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
};
Text.defaultProps = {
  size: 'medium',
};

export default Text;
