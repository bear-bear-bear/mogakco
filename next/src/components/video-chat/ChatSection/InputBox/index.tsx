import React, { useState } from 'react';

import Editor from './TuiEditor';
import Textarea from './ImageUploadableTextArea';
import SVGButton from './SVGButton';
import * as S from './style';

const InputBox = () => {
  const [isShowEditor, setIsShowEditor] = useState(false);

  const handleFileUploadButtonClick = () => {
    alert('파일 업로드 미구현');
  };

  const handleEditorPopUpButtonClick = () => {
    setIsShowEditor(true);
  };

  return (
    <>
      <S.InputBox>
        <S.Header>
          <SVGButton
            SvgComponent={S.EditorPopUpSVG}
            buttonProps={{
              title: '마크다운 에디터 사용하기',
              'aria-label': 'Open markdown editor',
            }}
            onClick={handleEditorPopUpButtonClick}
          />
          <SVGButton
            SvgComponent={S.FileUploadSVG}
            buttonProps={{
              title: '파일 업로드',
              'aria-label': 'Upload files',
            }}
            onClick={handleFileUploadButtonClick}
          />
        </S.Header>
        <Textarea />
      </S.InputBox>
      {isShowEditor && <Editor setIsShow={setIsShowEditor} />}
    </>
  );
};

export default InputBox;
