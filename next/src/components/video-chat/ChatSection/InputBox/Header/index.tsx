import React, { useContext } from 'react';
import SVGButton from '@components/common/SVGButton';

import { EditorShowContext } from '../index';
import * as S from './style';

const Header = () => {
  const [, setIsShowEditor] = useContext(EditorShowContext);

  const handleEditorPopUpButtonClick = () => {
    setIsShowEditor(true);
  };

  return (
    <S.Header>
      <SVGButton
        SvgComponent={S.EditorPopUpSVG}
        buttonProps={{
          title: '마크다운 에디터 사용하기',
          'aria-label': 'Open markdown editor',
        }}
        onClick={handleEditorPopUpButtonClick}
      />
    </S.Header>
  );
};

export default Header;
