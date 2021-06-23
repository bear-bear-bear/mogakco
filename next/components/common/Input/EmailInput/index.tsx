import React, { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';

import { UseFormSetValue } from 'react-hook-form';
import { FormInputs } from '@components/signup/Start';
import TextInput from '~/components/common/Input/TextInput';
import * as S from './style';

type Props = {
  scale?: 'small' | 'medium';
  setValue: UseFormSetValue<FormInputs>;
};

/**
 * @desc 현재 입력 중인 값을 취소할 수 있는 버튼을 가진 email input입니다.
 * useState hook의 리턴값인 value, setValue 를 인자로 받습니다.
 */

// TODO: 이 부분 구조 복잡하네요. 원 작성자분이 수정해주세요. ( 타입 작업해놓음 ) writen by galaxy4276
const EmailInput = React.forwardRef<
  HTMLInputElement,
  Props & InputHTMLAttributes<HTMLInputElement>
>(({ scale = 'medium', value, setValue, ...rest }, ref) => (
  <S.EmailWrapper>
    <TextInput ref={ref} scale={scale} value={value} {...rest} />
    {value && <S.DeleteButton onClick={() => setValue('email', '')} />}
  </S.EmailWrapper>
));

EmailInput.displayName = 'EmailInput';

export default EmailInput;
