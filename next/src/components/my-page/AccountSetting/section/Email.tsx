import type { UseFormRegister, FormState } from 'react-hook-form';

import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import Warning from '@components/common/Warning';
import { emailRule } from '@lib/regex';

import * as S from '../style';

interface Email {
  email: string;
}
interface Props {
  register: UseFormRegister<Email>;
  errors: FormState<Email>['errors'];
}

const EmailSection = ({ register, errors }: Props) => (
  <>
    <InputWrapper>
      <Label htmlFor="email" direction="bottom">
        이메일
      </Label>
      <S.Input
        type="text"
        id="email"
        spellCheck="false"
        {...register('email', {
          pattern: {
            value: emailRule,
            message: '올바른 형식의 이메일을 입력해주세요.',
          },
          required: true,
        })}
      />
    </InputWrapper>
    {errors.email && <Warning>{errors.email.message}</Warning>}
  </>
);

export default EmailSection;
