import styled from '@emotion/styled';
import { BsFileEarmarkArrowUp } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';

export const InputBox = styled.div`
  border-top: 1px solid var(--color-gray-3);
`;

export const Header = styled.header`
  height: 2rem;
  padding: 0.33rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FileAddButton = styled(BsFileEarmarkArrowUp)`
  cursor: pointer;
`;

/* 아래 Temp 붙은 친구들은 editer 라이브러리 도입 전 임시 form을 담당합니다. */
export const TempEditorForm = styled.form`
  height: 8rem;
  position: relative;
  border-top: 1px solid var(--color-gray-3);
`;

export const TempTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border: none;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: -0.01rem;

  &::placeholder {
    font-size: inherit;
    font-weight: inherit;
    color: var(--color-gray-3);
  }

  &:focus {
    outline: none;
  }
`;

export const TempSendButton = styled(AiOutlineSend)`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  cursor: pointer;

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;
