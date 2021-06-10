import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '~/components/common/Input/TextInput';
import * as S from './style';

/**
 * @desc 현재 입력 중인 값을 취소할 수 있는 버튼을 가진 email input입니다.
 * useState hook의 리턴값인 value, setValue 를 인자로 받습니다.
 */
const EmailInput = React.forwardRef(
  ({ size, value, setValue, ...rest }, ref) => (
    <S.EmailWrapper>
      <TextInput ref={ref} size={size} value={value} {...rest} />
      {value && <S.DeleteButton onClick={() => setValue('')} />}
    </S.EmailWrapper>
  ),
);

EmailInput.displayName = 'EmailInput';
EmailInput.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  setValue: PropTypes.func.isRequired,
};
EmailInput.defaultProps = {
  size: 'medium',
};

export default EmailInput;
