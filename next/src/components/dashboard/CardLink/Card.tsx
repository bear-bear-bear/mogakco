import React, { useCallback } from 'react';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

import { getRecommendChatRoom } from '@lib/apis';
import { useRouter } from 'next/router';
import * as S from './style';

interface IProps {
  title: string;
  desc: string;
  svgName: `${string}.svg`;
}

/**
 * @desc CardLink 컴포넌트를 그대로 배껴서 만든 컴포넌트
 * @desc 기존 클릭 시 최상단 next/link 컴포넌트에 의해 리다이렉션 되었다면, 여기는 함수 발생
 */
const Card = ({ title, desc, svgName }: IProps) => {
  const router = useRouter();

  const onClickGetRoom = useCallback(async () => {
    const roomId = await getRecommendChatRoom();
    await router.push(`/video-chat/${roomId}`);
  }, [router]);

  return (
    <Box onClick={onClickGetRoom}>
      <S.CardAnchor>
        <Image
          src={`/svg/${svgName}`}
          layout="intrinsic"
          width={200}
          height={200}
        />
        <h1>{title}</h1>
        <p>{desc}</p>
      </S.CardAnchor>
    </Box>
  );
};

export default Card;
