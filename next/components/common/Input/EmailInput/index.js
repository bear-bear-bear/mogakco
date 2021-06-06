import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '~/components/common/Input/TextInput';
import * as S from './style';

/**
 * @desc 현재 입력 중인 값을 취소할 수 있는 버튼을 가진 email input입니다.
 */
const EmailInput = React.forwardRef(({ size, ...rest }, ref) => (
  <S.EmailWrapper>
    <TextInput ref={ref} size={size} {...rest} />
    <S.DeleteButton />
  </S.EmailWrapper>
));

EmailInput.displayName = 'EmailInput';
EmailInput.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
};
EmailInput.defaultProps = {
  size: 'medium',
};

export default EmailInput;
