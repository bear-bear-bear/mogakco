import React from 'react';

import Input from '@components/common/Input';
import Label from '@components/common/Label';

import * as S from '@components/sign-up/Required/style';

type Props = {
  term: boolean;
  onChangeTerm: () => void;
};

const TermSection = ({ term, onChangeTerm }: Props) => {
  return (
    <>
      <S.TermWrapper>
        <Input
          id="policy"
          type="checkbox"
          checked={term}
          onChange={onChangeTerm}
        />
        <Label htmlFor="policy" direction="left">
          (필수)개인정보 수집 및 이용에 동의하겠습니다.
        </Label>
      </S.TermWrapper>
    </>
  );
};

export default TermSection;
