import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import Warning from '@components/common/Warning';
import { emailRule } from '@lib/regex';

import type { RequiredFieldsSectionProps } from '..';
import * as S from '../style';

const EmailSection = ({ register, errors }: RequiredFieldsSectionProps) => (
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
