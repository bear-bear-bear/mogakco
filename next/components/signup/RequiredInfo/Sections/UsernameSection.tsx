import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import Desc from '@components/common/Desc';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import Input from '@components/common/Input';
import { usernameRule } from '@lib/regex';

import { InputValues } from '../typings';

import * as S from '../style';

type Props = {
  register: UseFormRegister<InputValues>;
};

const UsernameSection = ({ register }: Props) => {
  return (
    <>
      <InputWrapper>
        <Label htmlFor="username" direction="bottom">
          * 별명
        </Label>
        <Input
          type="text"
          id="username"
          scale="small"
          spellCheck={false}
          {...register('username', { pattern: usernameRule, maxLength: 12 })}
        />
      </InputWrapper>
      <S.DescWrapper>
        <Desc scale="small">
          ※ 한글, 영문, 숫자, 마침표를 사용할 수 있습니다
        </Desc>
      </S.DescWrapper>
    </>
  );
};

export default UsernameSection;
