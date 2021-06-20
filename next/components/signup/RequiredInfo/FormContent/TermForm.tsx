import React from 'react';
import * as S from '~/components/signup/RequiredInfo/style';
import CheckboxInput from '~/components/common/Input/CheckboxInput';
import Label from '~/components/common/Label';

type Props = {
  term: boolean;
  onChangeTerm: () => void;
};

const TermForm = ({ term, onChangeTerm }: Props) => {
  return (
    <>
      <S.TermWrapper>
        <CheckboxInput
          id="policy"
          type="checkbox"
          value={term}
          onChange={onChangeTerm}
        />
        <Label htmlFor="policy" direction="left">
          (필수)개인정보 수집 및 이용에 동의하겠습니다.
        </Label>
      </S.TermWrapper>
    </>
  );
};

export default TermForm;
