import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

import Desc from '@components/common/Desc';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import Input from '@components/common/Input';
import { usernameRule } from '@lib/regex';

import type { InputValues } from '../typings';

import * as S from '../style';

interface IProps {
  register: UseFormRegister<InputValues>;
}

const UsernameSection = ({ register }: IProps) => {
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
          required
          {...register('username', {
            pattern: {
              value: usernameRule,
              message: '형식에 맞는 별명을 입력하세요.',
            },
            maxLength: {
              value: 12,
              message: '별명은 12자를 넘을 수 없습니다.',
            },
            required: '별명란를 입력해주세요',
          })}
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
