import styled from '@emotion/styled';
import { FiChevronLeft } from 'react-icons/fi';
import UploadIcon from '@public/svg/upload.svg';

interface ContainerStyleProps {
  isShow: boolean;
  isShowDropzoneUI: boolean;
}

export const Container = styled.section<ContainerStyleProps>`
  width: 20rem;
  height: 100vh;
  display: ${({ isShow }) => (isShow ? 'grid' : 'none')};
  position: ${({ isShowDropzoneUI }) =>
    isShowDropzoneUI ? 'relative' : 'static'};
  grid-template-rows: [Header] max-content [chatList] 1fr [InputBox] max-content;
  background-color: ${({ theme }) => theme.color['white-1']};
`;

export const Dropzone = styled.section`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.95);
`;

export const FileAddIcon = styled(UploadIcon)`
  width: 3rem;
  height: 3rem;
`;

export const Header = styled.header`
  position: relative;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatTitle = styled.h1`
  font-size: 1.33rem;
  font-weight: 500;
`;

export const ChatMemberCount = styled.span`
  font-size: 1rem;
  font-weight: 500;
  padding-left: 0.2rem;
`;

export const ChatCloseButton = styled(FiChevronLeft)`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translate(50%, -50%);
  cursor: pointer;
  font-size: 1.8rem;
`;
