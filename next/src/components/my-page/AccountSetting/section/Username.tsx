import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import Warning from '@components/common/Warning';
import { usernameRule } from '@lib/regex';

import type { RequiredFieldsSectionProps } from '..';
import * as S from '../style';

const UsernameSection = ({ register, errors }: RequiredFieldsSectionProps) => (
  <>
    <InputWrapper>
      <Label htmlFor="username" direction="bottom">
        유저명
      </Label>
      <S.Input
        type="text"
        id="username"
        spellCheck="false"
        {...register('username', {
          pattern: {
            value: usernameRule,
            message:
              '규칙에 맞는 유저명을 입력해주세요 (영문/한글/숫자/마침표 1-12자).',
          },
          required: true,
        })}
      />
    </InputWrapper>
    {errors.username && <Warning>{errors.username.message}</Warning>}
  </>
);

export default UsernameSection;
