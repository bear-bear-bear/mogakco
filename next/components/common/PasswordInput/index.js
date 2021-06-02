import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '~/components/common/TextInput';
import * as S from './style';

/**
 * @desc visible 상태를 끄고 켤 수 있는 input(type="password") 컴포넌트입니다.
 * 컴포넌트를 관리할 isVisible, onClickEye은 부모 컴포넌트에서 props로 부여합니다.
 */
const PasswordInput = React.forwardRef(
  ({ size, isVisible, onClickEye, type, ...rest }, ref) => (
    <S.PasswordWrapper>
      <TextInput
        ref={ref}
        size={size}
        type={isVisible ? 'text' : 'password'}
        {...rest}
      />
      {isVisible ? (
        <S.CloseEye onClick={onClickEye} />
      ) : (
        <S.OpenEye onClick={onClickEye} />
      )}
    </S.PasswordWrapper>
  ),
);

PasswordInput.displayName = 'PasswordInput';
PasswordInput.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  type: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClickEye: PropTypes.func.isRequired,
};
PasswordInput.defaultProps = {
  size: 'medium',
};

export default PasswordInput;
