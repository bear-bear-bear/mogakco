import ImageLogo from '@public/svg/logo2.svg';

import * as S from './style';

type Props = {
  toggleModal: () => void;
};

const Trigger = ({ toggleModal }: Props) => {
  return (
    <S.Trigger>
      <ImageLogo onClick={toggleModal} />
    </S.Trigger>
  );
};

export default Trigger;
