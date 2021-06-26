import React from 'react';
import * as S from './style';

const InputBox = () => {
  return (
    <S.InputBox>
      <S.Header>
        <S.FileAddButton />
      </S.Header>
      {/* 아래 Temp 붙은 친구들은 editer 라이브러리 도입 전 임시 form을 담당합니다. */}
      <S.TempEditorForm action="" method="POST">
        <S.TempTextArea name="" placeholder="여기에 메세지 입력 ..." />
        <S.TempSendButton />
      </S.TempEditorForm>
    </S.InputBox>
  );
};

export default InputBox;
