import styled from '@emotion/styled';
import Popup from 'reactjs-popup';
import Button from '@components/common/Button';

export const StyledPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"
  &-overlay {
    background-color: rgba(0, 0, 0, 0.9);
  }
  // use your custom style for ".popup-content"
  &-content {
    display: grid;
    grid-template-rows: [content] 1fr [buttons] max-content;
    width: 20rem;
    max-width: 100%;
    min-height: 8rem;
    background-color: var(--color-white);
  }
`;

export const Content = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  padding: 1.1rem;
  line-height: 1.4;
`;

export const Buttons = styled.section`
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--color-gray-1);
`;

export const ButtonWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex: 1;
`;

export const CustomButton = styled(Button)`
  border-radius: 0;
`;
