import styled from '@emotion/styled';
import { BsFileEarmarkArrowUp } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';

export const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 10rem;
`;

export const Header = styled.header`
  padding: 0.33rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid var(--color-gray-1);
  border-bottom: 1px solid var(--color-gray-1);
`;

export const FileAddButton = styled(BsFileEarmarkArrowUp)`
  cursor: pointer;
`;

export const TempTextArea = styled.textarea`
  flex: 1;
  padding: 0.33rem 0.5rem;
  border: none;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  letter-spacing: -0.01rem;
  color: var(--color-black);
  line-height: 1.1;

  &::placeholder {
    font-size: inherit;
    font-weight: inherit;
    color: var(--color-gray-3);
    vertical-align: middle;
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
