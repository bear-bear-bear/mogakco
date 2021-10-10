import React from 'react';
import type { PopupProps } from 'reactjs-popup/dist/types';
import type { NoUndefinedField } from 'typings/common';

import * as S from './style';

export type RequiredProps = NoUndefinedField<{
  open: PopupProps['open'];
  onClose: PopupProps['onClose'];
  content: string | string[];
}>;

type ConfirmCallback = () => void;
type CloseCallback = () => void;
export type Callback =
  | ConfirmCallback
  | [ConfirmCallback, CloseCallback]
  | undefined;

export type Props = RequiredProps & {
  callback?: Callback;
};

/**
 * @desc 참고 - hooks/useModal로 편리하게 사용할 수 있습니다.
 */
const Modal = ({ open, onClose, content, callback }: Props) => {
  const handleConfirmClick = () => {
    onClose();

    if (!callback) return;
    if (Array.isArray(callback)) {
      callback[0]();
      return;
    }
    callback();
  };

  const handleCloseClick = () => {
    onClose();

    if (!callback) return;
    if (Array.isArray(callback)) {
      callback[1]();
    }
  };

  return (
    <S.StyledPopup open={open} onClose={handleCloseClick} closeOnDocumentClick>
      {Array.isArray(content) ? (
        <S.Content>
          {content.map((v) => (
            <p key={`${v}`}>▪{v}</p>
          ))}
        </S.Content>
      ) : (
        <S.Content>
          <p>{content}</p>
        </S.Content>
      )}
      <S.Buttons>
        {callback && (
          <S.ButtonWrapper>
            <S.CustomButton
              color="white"
              onClick={handleConfirmClick}
              fullWidth
            >
              확인
            </S.CustomButton>
          </S.ButtonWrapper>
        )}
        <S.ButtonWrapper>
          <S.CustomButton onClick={handleCloseClick} fullWidth>
            닫기
          </S.CustomButton>
        </S.ButtonWrapper>
      </S.Buttons>
    </S.StyledPopup>
  );
};

export default Modal;
