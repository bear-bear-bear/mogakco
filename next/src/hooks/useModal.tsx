import { useState } from 'react';
import Modal from '@components/common/Modal';
import type { Props as ModalProps } from '@components/common/Modal';

type Props = Pick<ModalProps, 'content' | 'callback'>;

/**
 * @desc
 * components/common/Modal을 편리하게 사용할 수 있게 해주는 훅
 *
 * @returns Modal - 모달 컴포넌트. 컴포넌트 아무곳에나 배치
 * @returns openModal - 모달 열기
 */
const useModal = ({ content, callback }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    Modal: () => (
      <Modal
        open={isOpen}
        onClose={closeModal}
        content={content}
        callback={callback}
      />
    ),
    openModal,
  };
};

export default useModal;
