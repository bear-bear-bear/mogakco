import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

/**
 * @desc label의 기본 스타일을 정의합니다. common/TextInput와 함께 사용한다면 size 값을 맞춰주세요.
 * direction은 정의할 input의 상대적인 방향을 말합니다. 해당 방향으로 margin이 적용됩니다.
 */

const Label = ({ size, direction, children, ...rest }) => (
  <S.Label size={size} direction={direction} {...rest}>
    {children}
  </S.Label>
);

Label.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  direction: PropTypes.oneOf(['right', 'left', 'top', 'bottom']).isRequired,
};
Label.defaultProps = {
  size: 'medium',
};

export default Label;
