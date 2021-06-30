import React from 'react';
import Fade from 'react-reveal/Fade';
import { Box, Flex } from '@chakra-ui/react';

import Image from 'next/Image';
import type { IRightContentBlockProps } from '@components/landing/ContentBlock';

import * as S from './style';

const RightContentBlock = ({
  title,
  content,
  imgName,
}: IRightContentBlockProps) => {
  return (
    <S.RightBlockContainer>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="center"
        align="center"
      >
        <Box w={{ base: '75%', lg: '50%' }}>
          <Fade left>
            <Image
              src={`/assets/svg/${imgName}`}
              layout="responsive"
              width={1000}
              height={700}
            />
          </Fade>
        </Box>
        <Box w={{ base: 'full', lg: '50%' }}>
          <Fade right>
            <S.ContentWrapper>
              <h1>{title}</h1>
              <p>{content}</p>
            </S.ContentWrapper>
          </Fade>
        </Box>
      </Flex>
    </S.RightBlockContainer>
  );
};

export default RightContentBlock;
