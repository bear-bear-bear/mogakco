import { css } from '@emotion/react';
import styled from '@emotion/styled';
import UploadSVG from '@public/svg/upload.svg';
import EditSVG from '@public/svg/edit.svg';
import SendSVG from '@public/svg/send.svg';
import { AiOutlineSend } from 'react-icons/ai';

export const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 10rem;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.66rem;
  padding: 0.1rem 0.33rem;
  border-top: 1px solid var(--color-gray-1);
  border-bottom: 1px solid var(--color-gray-1);
`;

export const SVGButton = styled.button`
  background-color: inherit;
  align-items: initial;
  border: none;
  padding: 0;
  border-left-width: 0;
  border-right-width: 0;
  line-height: 0.9;
  cursor: pointer;
`;

const svgInButtonStyles = css`
  width: 1.33rem;
  height: 1.33rem;
`;

export const EditorPopUpSVG = styled(EditSVG)`
  ${svgInButtonStyles}
`;

export const FileUploadSVG = styled(UploadSVG)`
  ${svgInButtonStyles}
`;

export const TextArea = styled.textarea`
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

export const SendButton = styled(SendSVG)`
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  ${svgInButtonStyles}

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;
