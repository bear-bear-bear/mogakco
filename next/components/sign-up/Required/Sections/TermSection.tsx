import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import Input from '@components/common/Input';
import Label from '@components/common/Label';

import * as S from '@components/sign-up/Required/style';
import type { InputValues } from '../typings';

type Props = {
  register: UseFormRegister<InputValues>;
};

const TermSection = ({ register }: Props) => {
  return (
    <S.TermWrapper>
      <Input
        id="policy"
        type="checkbox"
        required
        {...register('term', {
          required: '약관에 동의해주세요',
        })}
      />
      <Label htmlFor="policy" direction="left">
        (필수)개인정보 수집 및 이용에 동의하겠습니다.
      </Label>
    </S.TermWrapper>
  );
};

export default TermSection;
