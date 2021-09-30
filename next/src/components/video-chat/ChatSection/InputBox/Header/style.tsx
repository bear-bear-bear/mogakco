import { css } from '@emotion/react';
import styled from '@emotion/styled';
import UploadSVG from '@public/svg/upload.svg';
import EditSVG from '@public/svg/edit.svg';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.66rem;
  padding: 0.1rem 0.33rem;
  border-top: 1px solid var(--color-gray-1);
  border-bottom: 1px solid var(--color-gray-1);
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
