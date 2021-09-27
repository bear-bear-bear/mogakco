import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import UploadSVG from '@public/svg/upload.svg';
import EditSVG from '@public/svg/edit.svg';
import CloseSVG from '@public/svg/cross.svg';
import Button from '@components/common/Button';

export const InputBox = styled.div`
  position: relative;
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

export const TextArea = styled.textarea`
  width: 100%;
  height: 8.5rem;
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

export const EditorBackground = styled.section`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);

  & > div {
    // Editor root
    background-color: var(--color-white);
  }
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

const svgInHeaderButtonStyles = css`
  width: 1.33rem;
  height: 1.33rem;
`;

export const EditorPopUpSVG = styled(EditSVG)`
  ${svgInHeaderButtonStyles}
`;

export const FileUploadSVG = styled(UploadSVG)`
  ${svgInHeaderButtonStyles}
`;

export const EditorCloseButton = styled(CloseSVG)`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 1.33rem;
  right: 1.33rem;

  path {
    stroke-width: 3;
    stroke: var(--color-white);
  }

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

const boundAnimation = keyframes`
  ${'0%, 50%, 100%'} {
    transform: scale(1);
  }

  ${'25%'} {
    transform: scale(1.1);
  }

  ${'75%'} {
    transform: scale(1.05);
  }
`;

export const SendButton = styled(Button)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  animation: ${boundAnimation} 2s ease-in-out infinite;
`;
